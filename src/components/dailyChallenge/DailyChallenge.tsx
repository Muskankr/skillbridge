"use client";

import { supabase } from "@/lib/supabase";
import { awardXP } from "@/features/xp/services/xp.service";
import {
  completeChallenge,
} from "@/features/dailyChallenges/services/challenge.service";
import { useDailyChallenges } from "@/features/dailyChallenges/hooks/useDailyChallenges";
import DailyChallengeCard from "./DailyChallengeCard";

export default function DailyChallenge() {
  const {
    challenges,
    loading,
    refresh,
  } = useDailyChallenges();

  async function handleComplete(challenge: any) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if (challenge.completed) return;

    await completeChallenge(
  user.id,
 challenge
);

    

    await refresh();

    alert(
      `🎉 +${challenge.xp} XP earned!`
    );
  }

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        Loading Challenges...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-black text-white">
          Daily Challenges
        </h1>

        <p className="mt-2 text-slate-400">
          Complete challenges to earn XP.
        </p>

      </div>

      {challenges.map((challenge) => (
        <DailyChallengeCard
          key={challenge.id}
          challenge={challenge}
          onComplete={() =>
            handleComplete(challenge)
          }
        />
      ))}

    </div>
  );
}