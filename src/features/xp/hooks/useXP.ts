"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { calculateLevel } from "../utils/level";

export function useXP() {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [nextLevel, setNextLevel] = useState(100);
  const [loading, setLoading] = useState(true);

  async function loadXP() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("xp_history")
      .select("points")
      .eq("user_id", user.id);

    const totalXP =
      data?.reduce(
        (sum, item) => sum + item.points,
        0
      ) || 0;

    const info = calculateLevel(totalXP);

    setXP(totalXP);
    setLevel(info.level);
    setNextLevel(info.next);

    setLoading(false);
  }

  useEffect(() => {
    loadXP();
  }, []);

  return {
    xp,
    level,
    nextLevel,
    loading,
    refresh: loadXP,
  };
}