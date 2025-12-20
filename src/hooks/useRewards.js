import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export function useRewards(user) {
  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchRewards = async () => {
      setLoading(true);

      const { data } = await supabase
        .from("rewards")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!data) {
        const { data: newData } = await supabase
          .from("rewards")
          .insert({ user_id: user.id })
          .select()
          .single();

        setRewards(newData);
      } else {
        setRewards(data);
      }

      setLoading(false);
    };

    fetchRewards();
  }, [user]);

  return { rewards, setRewards, loading };
}
