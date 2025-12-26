import React, { useState } from "react";

type Tab = "all" | "unlocked" | "locked" | "comingSoon";

export default function RedeemRewards() {
  const [activeTab, setActiveTab] = useState<Tab>("all");

//   const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { key: "all", label: "All Rewards", count: 8 },
    { key: "unlocked", label: "Unlocked", count: 0 },
    { key: "locked", label: "Locked", count: 7 },
    { key: "coming", label: "Coming Soon", count: 1 },
  ];

  const rewards = [
    {
      id: 1,
      title: "$5 Bank Transfer",
      desc: "The $5 equivalent will be transferred to your bank account.",
      points: 5000,
      status: "locked",
      icon: "💵",
    },
    {
      id: 2,
      title: "$5 PayPal International",
      desc: "Receive a $5 PayPal balance transfer directly to your PayPal account email.",
      points: 5000,
      status: "locked",
      icon: "💸",
    },
    {
      id: 3,
      title: "$5 Virtual Visa Card",
      desc: "Use your $5 prepaid card to shop anywhere Visa is accepted online.",
      points: 5000,
      status: "locked",
      icon: "🎁",
    },
    {
      id: 4,
      title: "$10 Gift Card",
      desc: "Redeem for shopping at supported stores.",
      points: 10000,
      status: "locked",
      icon: "🛍️",
    },
    {
      id: 5,
      title: "$15 Gift Card",
      desc: "Higher rewards — more value.",
      points: 15000,
      status: "locked",
      icon: "🎉",
    },
    {
      id: 6,
      title: "$20 Gift Card",
      desc: "Perfect for bigger purchases.",
      points: 20000,
      status: "locked",
      icon: "💳",
    },
    {
      id: 7,
      title: "$25 Gift Card",
      desc: "Save more and redeem bigger.",
      points: 25000,
      status: "locked",
      icon: "🌟",
    },

    // ⭐ SPECIAL COMING SOON CARD
    {
      id: 8,
      title: "Free Udemy Courses",
      desc: "Coming Soon!",
      points: 0,
      status: "comingSoon",
      icon: "📚",
    },
  ];

  const filteredRewards = rewards.filter((r) => {
    if (activeTab === "all") return true;
    if (activeTab === "locked") return r.status === "locked";
    if (activeTab === "comingSoon") return r.status === "comingSoon";
    if (activeTab === "unlocked") return r.status === "unlocked";
    return true;
  });

  return (
    <div
    className="w-full py-6 bg-white rounded-2xl"
    style={{
      minHeight: "520px",
      maxHeight: "520px",
      overflowY: "hidden"
    }}
  >
      {/* Tabs */}
      <div className="flex gap-6 text-sm font-medium mb-6">
        {[
          { label: "All Rewards", key: "all" },
          { label: "Unlocked", key: "unlocked" },
          { label: "Locked", key: "locked" },
          { label: "Coming Soon", key: "comingSoon" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as Tab)}
            className={`px-3 pb-2 relative ${
              activeTab === tab.key
                ? "text-[#7C3AED] after:absolute after:w-full after:h-[2px] after:bg-[#7C3AED] after:left-0 after:-bottom-[2px]"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full bg-[#7C3AED]" />
        <h2 className="text-lg font-semibold text-gray-900">
          Redeem Your Points
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <div
            key={reward.id}
            className="rounded-2xl border border-gray-100 shadow-sm bg-white p-6 flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 rounded-full bg-purple-50 flex items-center justify-center text-2xl mb-4">
              {reward.icon}
            </div>

            <p className="font-semibold text-gray-900 mb-1">{reward.title}</p>

            <p className="text-sm text-gray-500 mb-4">{reward.desc}</p>

            <div className="flex items-center gap-1 text-sm text-purple-600 mb-4">
              ⭐ {reward.points} pts
            </div>

            <button
              disabled
              className="w-full h-10 rounded-full bg-gray-100 text-gray-400 text-sm font-medium"
            >
              {reward.status === "comingSoon" ? "Coming Soon" : "Locked"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
