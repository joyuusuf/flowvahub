import React, { useState, useMemo } from "react";

type RewardStatus = "locked" | "coming-soon";

interface Reward {
    id: number;
    title: string;
    description: string;
    points: number;
    status: RewardStatus;
    icon: string;
    specialText?: string;
}

const rewardsData: Reward[] = [
    {
        id: 1,
        title: "$5 Bank Transfer",
        description:
            "The $5 equivalent will be transferred to your bank account.",
        points: 5000,
        status: "locked",
        icon: "💸",
    },
    {
        id: 2,
        title: "$5 PayPal International",
        description:
            "Receive a $5 PayPal balance transfer directly to your PayPal account email.",
        points: 5000,
        status: "locked",
        icon: "💸",
    },
    {
        id: 3,
        title: "$5 Virtual Visa Card",
        description:
            "Use your $5 prepaid card to shop anywhere Visa is accepted online.",
        points: 5000,
        status: "locked",
        icon: "🎁",
    },
    {
        id: 4,
        title: "$10 Voucher",
        description: "Get a $10 shopping voucher you can redeem online.",
        points: 9000,
        status: "locked",
        icon: "🏷️",
    },
    {
        id: 5,
        title: "$15 Gift Card",
        description: "Redeem a $15 digital gift card instantly.",
        points: 12000,
        status: "locked",
        icon: "🎉",
    },
    {
        id: 6,
        title: "$20 Wallet Credit",
        description: "Add $20 to your digital wallet.",
        points: 15000,
        status: "locked",
        icon: "💳",
    },
    {
        id: 7,
        title: "$25 Bonus",
        description: "Get $25 applied to your rewards balance.",
        points: 20000,
        status: "locked",
        icon: "⭐",
    },

    // Coming soon
    {
        id: 8,
        title: "Free Udemy Courses",
        description: "Access premium online courses for free.",
        points: 0,
        status: "coming-soon",
        icon: "📚",
        specialText: "Coming Soon!",
    },
];

const tabs = ["All Rewards", "Unlocked", "Locked", "Coming Soon"] as const;

export default function Rewards() {
    const [activeTab, setActiveTab] =
        useState<(typeof tabs)[number]>("All Rewards");

    // counts
    const lockedCount = rewardsData.filter(r => r.status === "locked").length;
    const comingCount = rewardsData.filter(
        r => r.status === "coming-soon"
    ).length;

    const filteredRewards = useMemo(() => {
        switch (activeTab) {
            case "Locked":
                return rewardsData.filter(r => r.status === "locked");
            case "Coming Soon":
                return rewardsData.filter(r => r.status === "coming-soon");
            case "Unlocked":
                return []; // currently none
            default:
                return rewardsData;
        }
    }, [activeTab]);

    return (
        <div className="w-full px-6 py-6">
            <h2 className="text-[22px] font-semibold text-gray-900 mb-4">
                Redeem Your Points
            </h2>

            {/* Tabs */}
            <div className="flex gap-6 border-b pb-2 mb-6">
                {tabs.map(tab => {
                    const count =
                        tab === "Locked"
                            ? lockedCount
                            : tab === "Coming Soon"
                                ? comingCount
                                : tab === "Unlocked"
                                    ? 0
                                    : rewardsData.length;

                    const active = activeTab === tab;

                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex items-center gap-1 text-sm font-medium relative pb-2 transition ${active ? "text-purple-600" : "text-gray-500 "
                                }`}
                        >
                            {tab}

                            {/* number right beside text */}
                            <span className={`${active ? "text-purple-700" : "text-gray-500"}`}>
                                ({count})
                            </span>

                            {active && (
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-600 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>


            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRewards.map(card => (
                    <div
                        key={card.id}
                        className="border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition"
                    >
                        <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-purple-50 flex items-center justify-center text-3xl">
                            {card.icon}
                        </div>

                        <h3 className="text-gray-800 font-semibold text-[16px] text-center">
                            {card.title}
                        </h3>

                        <p className="text-gray-500 text-sm text-center mt-2 leading-5">
                            {card.description}
                        </p>

                        {/* coming soon text */}
                        {card.specialText && (
                            <p className="text-purple-500 text-sm font-semibold text-center mt-3">
                                {card.specialText}
                            </p>
                        )}

                        {/* points */}
                        <div className="flex items-center justify-center gap-2 mt-4 text-sm">
                            <span className="text-yellow-500 text-lg">⭐</span>
                            <span className="text-purple-600 font-semibold">
                                {card.points} pts
                            </span>
                        </div>

                        {/* button */}
                        <button className="w-full mt-5 text-sm py-2 rounded-xl bg-gray-100 text-gray-500 font-medium cursor-not-allowed">
                            Locked
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
