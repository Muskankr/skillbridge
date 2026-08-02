"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getDashboardStats } from "@/features/dashboard/services/dashboard.service";
import { calculateLevel } from "@/features/xp/utils/level";

export function useDeveloperHub() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const stats = await getDashboardStats(user.id);

    const levelInfo = calculateLevel(stats.totalXP);

    setData({
      ...stats,
      totalXP: stats.totalXP,
      level: levelInfo.level,
      nextXP: levelInfo.next,
    });

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    data,
    loading,
    refresh: load,
  };
}