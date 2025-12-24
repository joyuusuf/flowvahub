import React from "react";

interface LevelUpModalProps {
  open: boolean;
  onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="relative w-[380px] max-w-[92%] rounded-xl bg-white shadow-2xl px-8 py-10 text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-10 w-10 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-purple-700">
          Level Up! 🎉
        </h2>

        {/* Points */}
        <p className="mt-3 text-3xl font-extrabold text-purple-600">
          +5 Points
        </p>

        {/* Small icons */}
        <div className="mt-3 flex justify-center gap-2 text-lg">
          <span>✨</span>
          <span>💎</span>
          <span>🎯</span>
        </div>

        {/* Message */}
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          You've claimed your daily points! Come back
          <br />
          tomorrow for more!
        </p>
      </div>
    </div>
  );
};

export default LevelUpModal;
