"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getAchievements } from "../services/achievement.service";

export interface Achievement {
  id: string;
  title: string;
 organization: string;
  description: string;
  achievement_date: string;
  proof_url: string;
  image_url: string;
  badge: string;
}

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
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

      const { data } = await getAchievements(user.id);

      setAchievements(data || []);
      setLoading(false);
    }

    load();
  }, []);

  return {
    achievements,
    loading,
  };
}