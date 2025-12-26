import { useEffect, useState } from "react";
import { Copy, Users } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { supabase } from "../services/supabase";

// Reuse referral code generator
function generateReferralCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Ensure referral code exists
async function ensureReferralCode(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("referral_code")
    .eq("id", userId)
    .single();

  if (!data?.referral_code) {
    const referralCode = generateReferralCode();
    await supabase.from("profiles").update({ referral_code: referralCode }).eq("id", userId);
    return referralCode;
  }

  return data.referral_code;
}

export default function ReferCard() {
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadReferral = async () => {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth?.user) return;

      const code = await ensureReferralCode(auth.user.id);
      if (!code) return;

      setReferralLink(`https://flowvahub.com/signup?ref=${code}`);
    };

    loadReferral();
  }, []);

  const handleCopy = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <span className="h-6 w-[4px] bg-[#2563EB] rounded-full" />
        <h2 className="text-2xl font-bold text-black">Refer & Earn</h2>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-xl border border-[#E5E7EB]">
        <div className="flex items-start gap-3 px-6 py-5 bg-[#eef2ff] rounded-t-xl">
          <Users className="text-brand mt-1" size={22} />
          <div>
            <h3 className="font-semibold text-[#6b7280]">Share Your Link</h3>
            <p className="text-sm text-[#6b7280]">
              Invite friends and earn 25 points when they join!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 text-center py-8 bg-[#f9fafb]">
          <div>
            <p className="text-3xl font-bold text-brand">0</p>
            <p className="text-sm text-textMuted mt-1">Referrals</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-brand">0</p>
            <p className="text-sm text-textMuted mt-1">Points Earned</p>
          </div>
        </div>

        <div className="px-6 pb-6 bg-[#f9fafb]">
          <p className="text-sm text-left text-[#6B7280] mb-2">Your personal referral link:</p>

          <div className="flex items-center gap-2 bg-[#F7F5FF] border border-[#E5E7EB] rounded-lg px-4 py-3">
            <input
              readOnly
              value={referralLink || "Generating link…"}
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button disabled={!referralLink} onClick={handleCopy} className="text-brand hover:opacity-80">
              <Copy />
            </button>
          </div>

          {copied && <p className="text-xs text-green-600 mt-2">Copied to clipboard!</p>}
        </div>
      </div>
    </>
  );
}
