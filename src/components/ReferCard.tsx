// src/components/ReferEarnCard.tsx
import { useEffect, useState } from "react";
import { Copy, Users } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { supabase } from "../services/supabase";

export default function ReferCard() {
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [referralCount, setReferralCount] = useState(0);
  const [referralPoints, setReferralPoints] = useState(0);

  // Fetch referral code & stats for a given user
  const fetchReferralData = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("referral_code, referral_count, points")
      .eq("id", userId)
      .single();

    if (!data) return;

    if (data.referral_code) {
      setReferralLink(`https://flowvahub.com/signup?ref=${data.referral_code}`);
    }

    setReferralCount(data.referral_count || 0);
    setReferralPoints(data.points || 0);
  };
useEffect(() => {
  const loadReferral = async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user) return;

    const { data } = await supabase
      .from("profiles")
      .select("referral_code")
      .eq("id", auth.user.id)
      .single();

    if (!data?.referral_code) return;

    setReferralLink(`https://flowvahub.com/signup?ref=${data.referral_code}`);
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
        {/* Header */}
        <div className="flex items-start gap-3 px-6 py-5 bg-[#eef2ff] rounded-t-xl">
          <Users className="text-brand mt-1" size={22} />
          <div>
            <h3 className="font-semibold text-[#6b7280]">Share Your Link</h3>
            <p className="text-sm text-[#6b7280]">
              Invite friends and earn 25 points when they join!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 text-center py-8 bg-[#f9fafb]">
          <div>
            <p className="text-3xl font-bold text-brand">{referralCount}</p>
            <p className="text-sm text-textMuted mt-1">Referrals</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-brand">{referralPoints}</p>
            <p className="text-sm text-textMuted mt-1">Points Earned</p>
          </div>
        </div>

        {/* Referral Link */}
        <div className="px-6 pb-6 bg-[#f9fafb]">
          <p className="text-sm text-left text-[#6B7280] mb-2">
            Your personal referral link:
          </p>

          <div className="flex items-center gap-2 bg-[#F7F5FF] border border-[#E5E7EB] rounded-lg px-4 py-3">
            <input
              readOnly
              value={referralLink || "Generating link…"}
              className="flex-1 bg-transparent text-sm outline-none"
            />
            <button
              disabled={!referralLink}
              onClick={handleCopy}
              className="text-brand hover:opacity-80"
            >
              <Copy />
            </button>
          </div>

          {copied && (
            <p className="text-xs text-green-600 mt-2">Copied to clipboard!</p>
          )}

          {/* Social Share */}
          <div className="flex justify-center gap-4 mt-6">
            <SocialIcon bg="#1877F2">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon bg="#000000">
              <SiX />
            </SocialIcon>
            <SocialIcon bg="#0A66C2">
              <FaLinkedinIn />
            </SocialIcon>
            <SocialIcon bg="#25D366">
              <FaWhatsapp />
            </SocialIcon>
          </div>
        </div>
      </div>
    </>
  );
}

function SocialIcon({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div
      style={{ backgroundColor: bg }}
      className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer"
    >
      {children}
    </div>
  );
}
