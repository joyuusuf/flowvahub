import { Upload, UploadCloud } from "lucide-react";
import React from "react";

interface ClaimReclaimModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const ClaimReclaimModal: React.FC<ClaimReclaimModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[480px] max-w-[95%] rounded-2xl bg-white shadow-2xl p-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-[20px] font-semibold text-gray-900 mb-2">
          Claim Your 25 Points
        </h2>

        <p className="text-sm text-left text-gray-700 leading-relaxed mb-4">
          Sign up for Reclaim (free, no payment needed), then fill the form below:
          <br />
          <span className="block text-left mt-2">
            1️⃣ Enter your Reclaim sign-up email.
          </span>
          <span className="block text-left">
            2️⃣ Upload a screenshot of your Reclaim profile showing your email.
          </span>
          After verification, you’ll get 25 Flowwa Points! 🎉 😊
        </p>

        {/* Email label */}
        <label className="text-sm text-left font-medium text-gray-800 mb-1 block">
          Email used on Reclaim
        </label>

        <input
          type="email"
          placeholder="user@example.com"
          className="w-full mb-4 h-[44px] rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 px-3 text-sm outline-none"
        />

        {/* File upload */}
        <label className="text-sm font-medium text-left text-gray-800 mb-1 block">
          Upload screenshot (mandatory)
        </label>

        <label className="w-full h-[70px] border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer text-sm text-gray-600 mb-6">
          <span className="text-xl mb-1">
            <UploadCloud/>
          </span>
          Choose file
          <input type="file" className="hidden" />
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 h-[40px] rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-5 h-[40px] rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold hover:opacity-95"
          >
            Submit Claim
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimReclaimModal;
