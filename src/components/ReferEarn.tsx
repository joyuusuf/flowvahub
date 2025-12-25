import React from "react";
import { Share2, Star, Users } from "lucide-react";

export default function ReferEarn() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 bg-gray">

            {/* Earn More Points */}

            <section className="space-y-5">
                {/* Section title */}
                <div className="flex items-center gap-3">
                    {/* Blue thick bar */}
                    <span className="h-6 w-[4px] bg-[#2563EB] rounded-full" />

                    <h2 className="text-2xl font-bold text-black">
                        Earn More Points
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Refer Card */}
                    <div
                        className="transition-all duration-200 ease-out hover:-translate-y-1
                 hover:border-blue-500 hover:shadow-md border border-borderMain rounded-xl overflow-hidden"
                    >
                        {/* TOP STRIP */}
                        <div className="flex items-center gap-4 bg-white px-5 py-4">
                            <div className="h-20 w-20 rounded-lg bg-[#FCF4FC] flex items-center justify-center">
                                <Star className="h-8 w-8 text-[#8B5CF6]" />
                            </div>

                            <p className="font-medium text-textMain text-sm">
                                Refer and win 10,000 points!
                            </p>
                        </div>

                        {/* BOTTOM CONTENT */}
                        <div className="bg-[#F9FAFB] px-5 py-4 border-t">
                            <p className="text-sm text-textMuted leading-relaxed">
                                Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of{" "}
                                <span className="text-[#9013fe] font-medium">10,000 points</span>.
                                Friends must complete onboarding to qualify.
                            </p>
                        </div>
                    </div>

                    {/* Share Stack */}
                    <div
                        className="transition-all duration-200 ease-out hover:-translate-y-1 hover:border-blue-500
                 hover:shadow-md border border-[#e5e7eb] rounded-xl bg-white overflow-hidden"
                    >
                        {/* TOP CONTENT */}
                        <div className="flex items-center gap-4 px-2 py-4 bg-white">
                            <div className="h-20 w-20 rounded-lg bg-[#eef2ff] flex items-center justify-center">
                                <Share2 className="h-8 w-8 text-[#8B5CF6]" />
                            </div>

                            <div>
                                <p className="font-medium text-textMain text-sm">
                                    Share Your Stack
                                </p>
                                <p className="text-xs text-textMuted">
                                    Earn +25 pts
                                </p>
                            </div>
                        </div>

                        {/* BOTTOM STRIP */}
                        <div className="bg-[#f9fafb] px-6 py-10 flex border-t items-center justify-between">
                            <p className="text-sm text-textMuted">
                                Share your tool stack
                            </p>

                            <button className="flex items-center gap-2 px-6 py-2 rounded-full
                           text-[#9013fe] hover:text-white text-sm font-medium
                           hover:bg-[#6f0fcc] transition">
                                <Share2 className="h-6 w-6" />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            
        </div>
    );
}
