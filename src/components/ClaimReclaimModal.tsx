import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { supabase } from "../services/supabase";

interface ClaimReclaimModalProps {
  open: boolean;
  onClose: () => void;
}

const ClaimReclaimModal: React.FC<ClaimReclaimModalProps> = ({
  open,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!email || !file) {
      alert("Please enter email and upload a screenshot");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Get authenticated user
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData?.user) {
        throw new Error("User not authenticated");
      }

      const userId = authData.user.id;

      // 2️⃣ Prevent duplicate claim
      const { data: existingClaim } = await supabase
        .from("reclaim_claims")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (existingClaim) {
        throw new Error("You have already claimed these points");
      }

      // 3️⃣ Upload screenshot to storage
      const filePath = `${userId}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("reclaim-screenshots")
        .upload(filePath, file);

      if (uploadError) {
        throw new Error("Failed to upload screenshot");
      }

      const { data: urlData } = supabase.storage
        .from("reclaim-screenshots")
        .getPublicUrl(filePath);

      // 4️⃣ Insert reclaim claim
      const { error: insertError } = await supabase
        .from("reclaim_claims")
        .insert({
          user_id: userId,
          email,
          screenshot_url: urlData.publicUrl,
        });

      if (insertError) {
        throw new Error("Failed to submit claim");
      }

      // 5️⃣ Add 25 points
      // First fetch current points
      const { data: currentReward, error: fetchError } = await supabase
        .from("user_rewards")
        .select("points")
        .eq("user_id", userId)
        .maybeSingle();

      if (fetchError) {
        throw new Error("Failed to fetch current points");
      }

      const newPoints = (currentReward?.points || 0) + 25;

      const { data: rewardData, error: rewardError } = await supabase
        .from("user_rewards")
        .update({
          points: newPoints,
        })
        .eq("user_id", userId)
        .select();

      if (rewardError || !rewardData || rewardData.length === 0) {
        throw new Error("Failed to add points");
      }

      alert("25 points successfully added 🎉");
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Email */}
        <label className="text-sm text-left font-medium text-gray-800 mb-1 block">
          Email used on Reclaim
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          className="w-full mb-4 h-[44px] rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 px-3 text-sm outline-none"
        />

        {/* File upload */}
        <label className="text-sm font-medium text-left text-gray-800 mb-1 block">
          Upload screenshot (mandatory)
        </label>

        <label className="w-full h-[70px] border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer text-sm text-gray-600 mb-6">
          <span className="text-xl mb-1">
            <UploadCloud />
          </span>
          {file ? file.name : "Choose file"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setFile(e.target.files ? e.target.files[0] : null)
            }
          />
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
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 h-[40px] rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-sm font-semibold hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Claim"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimReclaimModal;
