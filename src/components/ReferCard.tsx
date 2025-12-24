// src/components/ReferEarnCard.tsx
import { Copy, Users } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function ReferCard() {
    return (

        < >
            {/* <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
                <h2 className="text-2xl font-bold text-left">Refer & Earn</h2>
            </div> */}

             <div className="flex items-center gap-3">
                    {/* Blue thick bar */}
                    <span className="h-6 w-[4px] bg-[#2563EB] rounded-full" />

                    <h2 className="text-2xl font-bold text-black">
                       Refer & Earn
                    </h2>
                </div>

            <div className="w-full max-w-5xl bg-white rounded-xl border border-[#E5E7EB]">
                {/* Header */}

                <div className="flex items-start gap-3 px-6 py-5 bg-[#eef2ff] rounded-t-xl">
                    <Users className="text-brand mt-1" size={22} />
                    <div >
                        <h3 className="font-semibold text-[#6b7280]">Share Your Link</h3>
                        <p className="text-sm text-[#6b7280]">
                            Invite friends and earn 25 points when they join!
                        </p>
                    </div>
                </div>

                {/* Stats */}
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

                {/* Referral Link */}
                <div className="px-6 pb-6 bg-[#f9fafb]">
                    <p className="text-sm text-left text-[#6B7280] mb-2">
                        Your personal referral link:
                    </p>

                    <div className="flex items-center gap-2 bg-[#F7F5FF] border border-[#E5E7EB] rounded-lg px-4 py-3">
                        <input
                            readOnly
                            value="https://flowvahub.com/signup/?ref=jawad6111"
                            className="flex-1 bg-transparent text-sm outline-none"
                        />
                        <button className="text-brand hover:opacity-80">
                            <Copy/>
                        </button>
                    </div>

                    {/* Social icons */}
                    <div className="flex justify-center gap-4 mt-6">
                        <SocialIcon bg="#1877F2"><FaFacebookF /></SocialIcon>
                        <SocialIcon bg="#000000"><SiX /></SocialIcon>
                        <SocialIcon bg="#0A66C2"><FaLinkedinIn /></SocialIcon>
                        <SocialIcon bg="#25D366"><FaWhatsapp /></SocialIcon>
                    </div>
                </div>
            </div>
        </>

    );
}

function SocialIcon({
    bg,
    children,
}: {
    bg: string;
    children: React.ReactNode;
}) {
    return (
        <div
            style={{ backgroundColor: bg }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white cursor-pointer"
        >
            {children}
        </div>
    );
}
