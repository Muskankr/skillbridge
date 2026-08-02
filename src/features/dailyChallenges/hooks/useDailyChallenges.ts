"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  getDailyChallenges,
  getUserChallenges,
} from "../services/challenge.service";

export function useDailyChallenges() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: challengeData } =
      await getDailyChallenges();

    const { data: completedData } =
      await getUserChallenges(user.id);

    const completedIds =
      completedData?.map(
        (item) => item.challenge_id
      ) || [];

    const finalData =
      challengeData?.map((challenge) => ({
        ...challenge,
        completed: completedIds.includes(
          challenge.id
        ),
      })) || [];

    setChallenges(finalData);

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    challenges,
    loading,
    refresh: load,
  };
}