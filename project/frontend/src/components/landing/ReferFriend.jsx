import { useState } from "react";

const ReferFriend = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://cafeserenity.bites/refer/abc123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="refer" className="py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          {/* Gift Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-700/30 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Refer your friends, get a{" "}
            <span className="text-red-400">₹100 discount!</span>
          </h2>

          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Share your unique referral link with friends. When they sign up and
            place their first order, you both get ₹100 off!
          </p>

          {/* Invite Link Box */}
          <div className="bg-black/50 border border-white/20 rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-white/50 text-sm mb-3">Your referral link</p>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-4 py-3">
              <span className="text-white/80 text-sm flex-1 truncate">
                https://cafeserenity.bites/refer/abc123
              </span>
              <button
                onClick={handleCopyLink}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Get Link Button */}
          <button className="mt-8 bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors">
            Get invite link now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReferFriend;