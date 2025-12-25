import { Calendar } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import LevelUpModal from "../components/LevelUpModal";
import ClaimReclaimModal from "../components/ClaimReclaimModal";
import RedeemRewards from "../components/RedeemRewards";
import ReferEarn from './ReferEarn';
import ReferCard from './ReferCard';

export default function RewardsDashboard(
    {
        streak,
        onClaim,
        onTabChange,
    }: {
        streak: number;
        onClaim: () => void;
        onTabChange?: (tab: 'Earn' | 'Redeem') => void;
    }
) {

    const [activeTab, setActiveTab] = useState<'Earn' | 'Redeem'>('Earn');
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const [points, setPoints] = useState(0);
    const [dailyStreak, setDailyStreak] = useState(0);
    const [claimedToday, setClaimedToday] = useState(false);
    const [showClaimModal, setShowClaimModal] = useState(false);

    const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const [coinFlipping, setCoinFlipping] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [claimedDayIndex, setClaimedDayIndex] = useState<number | null>(null);
    new Date().getDay()
    const getTodayIndex = () => {
        const jsDay = new Date().getDay(); // 0–6 (Sun–Sat)
        return (jsDay + 6) % 7;            // Shift so Monday becomes 0
    };


    useEffect(() => {
        const timer = setTimeout(() => setCoinFlipping(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const { data: auth } = await supabase.auth.getUser();
            if (!auth?.user) return;

            const { data } = await supabase
                .from('user_rewards')
                .select('points, daily_streak, last_check_in')
                .eq('user_id', auth.user.id)
                .single();

            if (!data) return;

            setPoints(data.points);
            setDailyStreak(data.daily_streak);

            const today = new Date().toISOString().split('T')[0];
            setClaimedToday(data.last_check_in === today);
        };

        fetchData();
    }, []);

    const handleDayClick = (index: number) => setSelectedDay(index);

    // const handleDailyClaim = async () => {
    //     if (claimedToday) return;

    //     const { data: auth } = await supabase.auth.getUser();
    //     if (!auth?.user) return;

    //     const today = new Date().toISOString().split("T")[0];

    //     const { error } = await supabase
    //         .from("user_rewards")
    //         .update({
    //             points: points + 5,
    //             daily_streak: dailyStreak + 1,
    //             last_check_in: today,
    //         })
    //         .eq("user_id", auth.user.id)
    //         .neq("last_check_in", today);

    //     if (!error) {
    //         setPoints(p => p + 5);
    //         setDailyStreak(s => s + 1);
    //         setShowModal(true);
    //     }
    // };
    const handleDailyClaim = async () => {
        if (claimedToday) return;

        const { data: auth } = await supabase.auth.getUser();
        if (!auth?.user) return;

        const today = new Date().toISOString().split("T")[0];

        const { error } = await supabase
            .from("user_rewards")
            .update({
                points: points + 5,
                daily_streak: dailyStreak + 1,
                last_check_in: today,
            })
            .eq("user_id", auth.user.id)
            .neq("last_check_in", today);

        if (!error) {
            setPoints(p => p + 5);
            setDailyStreak(s => s + 1);
            setShowModal(true);
            setClaimedToday(true);


            const todayIndex = getTodayIndex();
            setClaimedDayIndex(todayIndex);
            setSelectedDay(todayIndex);

            setTimeout(() => {
                setClaimedDayIndex(null);
            }, 5 * 60 * 1000);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setClaimedToday(true);
    };

    const handleFeaturedClaim = async () => {
        setShowClaimModal(true);
    };

    // ✅ Updated Sign Up Button Logic
    const handleSignup = () => {
        window.location.href = "/signup"; // Navigate to your signup page
    };

    return (
        <div className="w-full px-6 py-[24px]">

            {/* Tabs */}
            <div className="flex gap-[30px] text-[14px] font-medium mb-[24px] px-[10px] sm:px-0">
                {['Earn', 'Redeem'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab as 'Earn' | 'Redeem');
                            onTabChange?.(tab as 'Earn' | 'Redeem');
                        }}
                        className={`px-[14px] py-[6px] rounded-[8px] relative transition-colors ${activeTab === tab
                            ? 'text-[#7C3AED] after:absolute after:-bottom-[2px] after:left-0 after:w-full after:h-[2px] after:bg-[#7C3AED]'
                            : 'text-[#6B7280]'
                            }`}
                    >
                        {tab === 'Earn' ? 'Earn Points' : 'Redeem Rewards'}
                    </button>
                ))}
            </div>

            {/* ================== EARN TAB ================== */}
            {activeTab === 'Earn' && (
                <>
                    {/* Title */}
                    <div className="flex items-center gap-[12px] mb-[24px] px-[16px] sm:px-0">
                        <div className="w-[4px] h-[24px] rounded-full bg-[#7C3AED]" />
                        <h1 className="text-[20px] font-semibold text-[#111827]">
                            Your Rewards Journey
                        </h1>
                    </div>

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
                                    <div className="text-[36px] font-bold text-[#7C3AED]">
                                        {points}
                                    </div>

                                    <div className="h-[40px] w-[40px] perspective">
                                        <div
                                            className={`h-full w-full relative transition-transform duration-1000 transform-style-preserve-3d ${coinFlipping ? 'rotate-y-180' : ''
                                                }`}
                                        >
                                            <div className="absolute inset-0 backface-hidden flex items-center justify-center rounded-full bg-[#FEF3C7]">
                                                <span className="text-[18px]">🪙</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-[16px]">
                                    <div className="flex justify-between text-[12px] text-[#6B7280] mb-[6px]">
                                        <span>Progress to $5 Gift Card</span>
                                        <span>{points}/5000</span>
                                    </div>
                                    <div className="h-[6px] w-full rounded-full bg-[#E5E7EB]">
                                        <div
                                            className="h-[6px] rounded-full bg-[#7C3AED]"
                                            style={{ width: `${Math.min((points / 5000) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="text-[12px] text-[#6B7280] flex items-center gap-[6px]">
                                    🚀 Keep earning points to unlock rewards!
                                </div>
                            </div>
                        </div>

                        {/* Daily Streak */}
                        <div className="xl:col-span-4 min-w-[300px] md:min-w-[310px] mr-[20px] rounded-[20px] bg-white-900 shadow-[0px_8px_24px_rgba(0,0,0,0.04)] p-[20px]">
                            <div className="bg-[#EEF2FF] px-[24px] py-[16px]">
                                <div className="flex items-center gap-[8px] text-[14px] font-semibold text-[#111827] mb-[16px]">
                                    <span className="text-[#7C3AED]">📅</span>
                                    Daily Streak
                                </div>
                            </div>

                            <div className="text-left text-[35px] font-bold text-[#7C3AED] mb-[16px]">
                                {dailyStreak} day
                            </div>

                            <div className="w-full mb-4">
                                <div className="flex justify-between">
                                    {weekDays.map((d, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleDayClick(i)}
                                            className={`size-8 sm:size-9 md:size-10 flex items-center justify-center rounded-full aspect-square shrink-0 font-medium text-sm transition-all
                                            ${claimedDayIndex === i
                                                    ? 'bg-[#DBEAFE] text-[#2563EB] border border-[#2563EB]'
                                                    : selectedDay === i
                                                        ? 'border-2 border-[#7C3AED] text-[#7C3AED] bg-white'
                                                        : 'bg-[#E5E7EB] text-[#6B7280]'
                                                }`}
                                        >
                                            {d}
                                        </button>
                                    ))}

                                </div>
                            </div>

                            <div className="text-[12px] text-[#6B7280] mb-[20px]">
                                Check in daily to earn +5 points
                            </div>

                            <button
                                onClick={handleDailyClaim}
                                disabled={claimedToday}
                                className="w-full h-[44px] rounded-full bg-[#7C3AED] text-white text-[14px] font-semibold flex items-center justify-center gap-[6px]"
                            >
                                ⚡ Claim Today's Points
                            </button>
                        </div>

                        {/* Featured */}
                        <div className="xl:col-span-4 rounded-[20px] overflow-hidden bg-white ml-[20px] shadow-[0px_8px_24px_rgba(0,0,0,0.04)] p-[24px]">
                            <div className="bg-gradient-to-br from-[#8B5CF6] to-[#7DD3FC] p-[24px] text-white relative flex flex-col items-start">
                                <div className="inline-flex items-center px-[10px] py-[4px] rounded-full bg-white/20 text-[12px] font-medium mb-4">
                                    Featured
                                </div>

                                <h1 className="text-[18px] font-bold leading-tight mb-2 text-left">
                                    Top Tool Spotlight
                                </h1>

                                <p className="text-[16px] font-semibold text-left">
                                    Reclaim
                                </p>

                                <div className="absolute top-[20px] right-[20px] h-[56px] w-[56px] rounded-full bg-[#6366F1] flex items-center justify-center overflow-hidden">
                                    <img src="/reclaim.png" alt="Reclaim icon" className="h-full w-full object-cover" />
                                </div>
                            </div>

                            <div className="p-[24px] flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-[15px] font-semibold text-[#111827] text-left">
                                    <Calendar size={18} className="text-purple-600" />
                                    Automate and Optimize Your Schedule
                                </div>

                                <p className="text-[13px] text-[#4B5563] leading-[1.6] text-left">
                                    Reclaim.ai is an AI-powered calendar assistant that automatically schedules
                                    your tasks, meetings, and breaks to boost productivity. Free to try — earn
                                    Flowva Points when you sign up!
                                </p>
                            </div>

                            <div className="px-[24px] pb-[24px] flex gap-[12px]">
                                <button
                                    onClick={handleSignup} // ✅ Updated navigation
                                    className="flex-1 h-[40px] rounded-full bg-[#7C3AED] text-white text-[14px] font-semibold flex items-center justify-center gap-1"
                                >
                                    ➕ Sign up
                                </button>
                                <button
                                    onClick={handleFeaturedClaim}
                                    className="flex-1 h-[40px] rounded-full bg-[#EC4899] text-white text-[14px] font-semibold flex items-center justify-center gap-1"
                                >
                                    🎁 Claim 50 pts
                                </button>
                            </div>
                        </div>

                    </div>

                    <ReferEarn />
                    <ReferCard />
                </>
            )}

            {/* ================== REDEEM TAB ================== */}
            {activeTab === 'Redeem' && (
                <div className="mt-4">
                    <RedeemRewards />
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <LevelUpModal open={showModal} onClose={handleCloseModal} />
                </div>
            )}

            {showClaimModal && (
                <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <ClaimReclaimModal
                        open={showClaimModal}
                        onClose={() => setShowClaimModal(false)}
                        onClaimSuccess={(addedPoints: number) => setPoints(p => p + addedPoints)}
                    />
                </div>
            )}

        </div>
    );
}
