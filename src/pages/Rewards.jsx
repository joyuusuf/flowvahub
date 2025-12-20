import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useRewards } from "../hooks/useRewards";
import PointsCard from "../components/PointsCard";
import StreakCard from "../components/StreakCard";
import Loader from "../components/Loader";

export default function Rewards() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const { rewards, setRewards, loading } = useRewards(user);

  if (loading) return <Loader />;

  const claimPoints = async () => {
    const today = new Date().toISOString().split("T")[0];
    if (rewards.last_check_in === today) {
      alert("Already claimed today!");
      return;
    }

    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    const newStreak =
      rewards.last_check_in === yesterday ? rewards.streak + 1 : 1;

    const updated = {
      points: rewards.points + 5,
      streak: newStreak,
      last_check_in: today,
    };

    await supabase
      .from("rewards")
      .update(updated)
      .eq("user_id", user.id);

    setRewards({ ...rewards, ...updated });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Rewards Hub</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PointsCard points={rewards.points} />
        <StreakCard streak={rewards.streak} onClaim={claimPoints} />
      </div>
    </div>
  );
}
