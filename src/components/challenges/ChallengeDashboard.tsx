import ChallengeSummary from "./ChallengeSummary";
import ChallengeCard from "./ChallengeCard";

import { dailyChallenges } from "@/constants/challenges";

export default function ChallengeDashboard() {
  return (
    <main className="space-y-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black">
            Daily Challenges
          </h1>

          <p className="mt-2 text-slate-400">
            Complete today's tasks and earn XP.
          </p>

        </div>

      </div>

      <ChallengeSummary />

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">

        {dailyChallenges.map((challenge) => (

          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
          />

        ))}

      </div>

    </main>
  );
}