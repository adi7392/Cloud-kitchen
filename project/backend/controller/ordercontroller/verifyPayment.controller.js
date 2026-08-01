import Order from "../../models/order.model.js";
import { verifyPaymentSignature } from "../../services/payment.service.js";
import ApiError from "../../utils/ApiError.util.js";
import asyncHandler from "../../utils/asyncHandler.util.js";

const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !orderId
  ) {
    throw new ApiError(400, "All payment fields are required");
  }

  const isValid = verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  );
  if (!isValid) throw new ApiError(400, "Payment verification failed");

  const order = await Order.findByIdAndUpdate(
    orderId,
    { paymentStatus: "paid" },
    { new: true },
  );

  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json({ message: "Payment verified successfully", order });
});

export default verifyPayment;