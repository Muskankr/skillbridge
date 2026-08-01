"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useCareerScore() {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  async function loadScore() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const [{ count: projects }, { count: certificates }, { count: achievements }] =
      await Promise.all([
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),

        supabase
          .from("certificates")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),

        supabase
          .from("achievements")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
      ]);

    let total = 0;

    if (profile?.full_name) total += 10;
    if (profile?.username) total += 5;
    if (profile?.bio) total += 10;
    if (profile?.college) total += 5;
    if (profile?.branch) total += 5;
    if (profile?.graduation_year) total += 5;
    if (profile?.github_url) total += 10;
    if (profile?.linkedin_url) total += 10;
    if (profile?.portfolio_url) total += 10;

    if ((projects ?? 0) > 0) total += 15;
    if ((certificates ?? 0) > 0) total += 10;
    if ((achievements ?? 0) > 0) total += 5;

    setScore(total);
    setLoading(false);
  }

  useEffect(() => {
    loadScore();
  }, []);

  return {
    score,
    loading,
    refresh: loadScore,
  };
}