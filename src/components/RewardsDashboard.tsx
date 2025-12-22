import { Calendar } from 'lucide-react';
import React, { useState } from 'react';

export default function RewardsDashboard() {
    const [activeTab, setActiveTab] = useState<'Earn' | 'Redeem'>('Earn');
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <div className="w-full px-0 py-[24px]">
            {/* Tabs */}
            <div className="flex gap-[24px] text-[14px] font-medium mb-[24px] px-[10px] sm:px-0">
                {['Earn', 'Redeem'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as 'Earn' | 'Redeem')}
                        className={`px-[14px] py-[6px] rounded-[8px] relative transition-colors ${activeTab === tab
                            ? 'text-[#7C3AED] after:absolute after:-bottom-[2px] after:left-0 after:w-full after:h-[2px] after:bg-[#7C3AED]'
                            : 'text-[#6B7280]'
                            }`}
                    >
                        {tab === 'Earn' ? 'Earn Points' : 'Redeem Rewards'}
                    </button>
                ))}
            </div>

            {/* Title */}
            <div className="flex items-center gap-[12px] mb-[24px] px-[16px] sm:px-0">
                <div className="w-[4px] h-[24px] rounded-full bg-[#7C3AED]" />
                <h1 className="text-[20px] font-semibold text-[#111827]">
                    Your Rewards Journey
                </h1>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-12 gap-[20px]">
                {/* Points Balance */}
                <div className="xl:col-span-4 rounded-[20px] bg-white-900 shadow-[0px_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">
                    <div className="bg-[#EEF2FF] px-[24px] py-[16px]">
                        <div className="flex items-center gap-[8px] text-[14px] font-semibold text-[#111827]">
                            <span className="text-[#7C3AED]">🏅</span>
                            Points Balance
                        </div>
                    </div>

                    <div className="p-[24px]">
                        <div className="flex items-center justify-between mb-[20px]">
                            <div className="text-[36px] font-bold text-[#7C3AED]">0</div>
                            <div className="h-[40px] w-[40px] rounded-full bg-[#FEF3C7] flex items-center justify-center">
                                <span className="text-[18px]">🪙</span>
                            </div>
                        </div>

                        <div className="mb-[16px]">
                            <div className="flex justify-between text-[12px] text-[#6B7280] mb-[6px]">
                                <span>Progress to $5 Gift Card</span>
                                <span>0/5000</span>
                            </div>
                            <div className="h-[6px] w-full rounded-full bg-[#E5E7EB]">
                                <div className="h-[6px] rounded-full bg-[#7C3AED] w-[0%]" />
                            </div>
                        </div>

                        <div className="text-[12px] text-[#6B7280] flex items-center gap-[6px]">
                            🚀 Just getting started — keep earning points!
                        </div>
                    </div>
                </div>

                {/* Daily Streak */}
                <div className="xl:col-span-4 rounded-[20px] bg-white-900 shadow-[0px_8px_24px_rgba(0,0,0,0.04)] p-[24px]">
                    <div className="flex items-center gap-[8px] text-[14px] font-semibold text-[#111827] mb-[16px]">
                        <span className="text-[#7C3AED]">📅</span>
                        Daily Streak
                    </div>

                    <div className="text-left text-[35px] font-bold text-[#7C3AED] mb-[16px]">
                        0 day
                    </div>

                    {/* Daily Streak Buttons */}
                    <div className="flex gap-1 mb-4 rounded-full overflow-hidden">
                        {weekDays.map((d, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedDay(i)}
                                className={`
        flex-1 h-10 sm:h-12 md:h-14 
        flex items-center justify-center text-[13px] sm:text-sm md:text-base 
        font-medium transition-colors
        ${i === 0 ? 'rounded-l-full' : ''}
        ${i === weekDays.length - 1 ? 'rounded-r-full' : ''}
        ${selectedDay === i
                                        ? 'border-2 border-[#7C3AED] text-[#7C3AED]'
                                        : 'bg-[#E5E7EB] text-[#6B7280]'
                                    }
      `}
                            >
                                {d}
                            </button>
                        ))}
                    </div>


                    <div className="text-[12px] text-[#6B7280] mb-[20px]">
                        Check in daily to earn +5 points
                    </div>

                    <button className="w-full h-[44px] rounded-full bg-[#7C3AED] text-white text-[14px] font-semibold flex items-center justify-center gap-[6px]">
                        ⚡ Claim Today's Points
                    </button>
                </div>

                {/* Featured */}
                <div className="xl:col-span-4 rounded-[20px] overflow-hidden shadow-[0px_8px_24px_rgba(0,0,0,0.04)]">
                    <div className="bg-gradient-to-br from-[#7C3AED] to-[#60A5FA] p-[24px] text-white flex flex-col gap-4">
                        <div className="inline-flex items-center px-[12px] py-[4px] rounded-full bg-white/20 text-[12px]">
                            Featured
                        </div>

                        <div className="flex items-center gap-2 text-[16px] font-semibold">
                            <Calendar size={18} />
                            Automate and Optimize Your Schedule
                        </div>

                        <div className="bg-white p-4 rounded-lg text-[#111827] text-[13px] leading-[1.6]">
                            Reclaim.ai is an AI-powered calendar assistant that automatically
                            schedules your tasks, meetings, and breaks. Free to try — earn
                            Flowva Points when you sign up!
                        </div>
                    </div>

                    <div className="bg-white p-[24px] flex gap-[12px]">
                        <button className="flex-1 h-[40px] rounded-full bg-[#7C3AED] text-white text-[14px] font-semibold">
                            ➕ Sign up
                        </button>
                        <button className="flex-1 h-[40px] rounded-full bg-[#F472B6] text-white text-[14px] font-semibold">
                            🎁 Claim 50 pts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
