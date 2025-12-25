import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useRewards } from "../hooks/useRewards";
import Loader from "../components/Loader";
import AppLayout from "../components/AppLayout";
import RewardsDashboard from "../components/RewardsDashboard";


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
    <AppLayout>
       <div className="w-full max-w-5xl mx-auto px-8 md:px-8 space-y-8">

        <RewardsDashboard
          points={rewards.points}
          streak={rewards.streak}
          onClaim={claimPoints}
        />

        
      </div>
    </AppLayout>
  );
}

