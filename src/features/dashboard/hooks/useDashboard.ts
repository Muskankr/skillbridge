"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getDashboardStats } from "../services/dashboard.service";
import { calculateLevel } from "@/features/xp/utils/level";

interface DashboardData {
  projects: number;
  certificates: number;
  achievements: number;
  xp: number;
  level: number;
  careerScore: number;
  profileCompletion: number;
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData>({
    projects: 0,
    certificates: 0,
    achievements: 0,
    xp: 0,
    level: 1,
    careerScore: 0,
    profileCompletion: 0,
  });

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
      projects: stats.projectCount,
      certificates: stats.certificateCount,
      achievements: stats.achievementCount,
      xp: stats.totalXP,
      level: levelInfo.level,
      careerScore: stats.careerScore,
      profileCompletion: stats.profileCompletion,
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