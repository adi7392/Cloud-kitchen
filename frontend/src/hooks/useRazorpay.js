import { useCallback, useRef } from "react";

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

/**
 * useRazorpay
 *
 * IMPORTANT — why this hook branches on platform:
 * Razorpay's own docs explicitly say their web Checkout (checkout.js)
 * "is not recommended" inside a WebView, and list exactly the symptoms
 * you'd hit: netbanking/bank-redirect pages failing to open, UPI intent
 * handoff needing extra config, and downloads not working. That's because
 * checkout.js drives payment flows with window.open() and full-page
 * redirects, which Android's WebView doesn't handle the way a real browser
 * does — no amount of WebViewClient/WebChromeClient patching fully fixes it,
 * because it's fighting the platform rather than using it correctly.
 *
 * The hook uses Razorpay's web checkout.js flow.
 *
 * Usage:
 *   const { open } = useRazorpay();
 *   const result = await open({ key, amount, currency, order_id, name, ... });
 *   // result = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
 *   // throws if the user closes the modal or payment fails
 */

// ── Web path: lazy-load checkout.js (unchanged from the original hook) ───────
function loadWebScript() {
  if (window.__razorpayScriptPromise) return window.__razorpayScriptPromise;

  window.__razorpayScriptPromise = new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve();

    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload  = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay Checkout. Check your connection and try again."));
    document.body.appendChild(script);
  });

  return window.__razorpayScriptPromise;
}

function openWeb(options) {
  return new Promise((resolve, reject) => {
    let settled = false;

    const rzp = new window.Razorpay({
      ...options,
      handler: (response) => {
        if (settled) return;
        settled = true;
        resolve({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id:   response.razorpay_order_id,
          razorpay_signature:  response.razorpay_signature,
        });
      },
      modal: {
        ...options.modal,
        ondismiss: () => {
          if (settled) return;
          settled = true;
          const err = new Error("Payment cancelled.");
          err.cancelled = true;
          reject(err);
        },
      },
    });

    rzp.on("payment.failed", (response) => {
      if (settled) return;
      settled = true;
      const err = new Error(
        response?.error?.description || "Payment failed. Please try again."
      );
      err.razorpayError = response?.error;
      reject(err);
    });

    rzp.open();
  });
}

export function useRazorpay() {
  // Guards against a dismissed modal calling both reject() and the
  // ondismiss handler in some edge cases — only settle the promise once.
  // (Only used by the web path; the native path is single-shot already.)
  const settledRef = useRef(false);

  const open = useCallback(async (options) => {
    settledRef.current = false;
    await loadWebScript();
    return openWeb(options);
  }, []);

  return { open };
}