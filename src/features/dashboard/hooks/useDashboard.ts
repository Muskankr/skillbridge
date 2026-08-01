"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getDashboardStats } from "../services/dashboard.service";

export function useDashboard() {

  const [data, setData] = useState({
    projects: 0,
    certificates: 0,
    achievements: 0,
    xp: 0,
    level: 1,
    careerScore: 0,
    profileCompletion: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const stats = await getDashboardStats(user.id);

setData(stats);

      setLoading(false);
    }

    load();

  }, []);

  return {
    data,
    loading,
  };
}