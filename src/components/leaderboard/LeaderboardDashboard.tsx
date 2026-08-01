import {
  leaderboardStats,
} from "@/constants/leaderboard";

import LeaderboardCard from "./LeaderboardCard";
import LeaderboardTable from "./LeaderboardTable";
import TopThree from "./TopThree";

export default function LeaderboardDashboard() {
  return (
    <main className="space-y-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black">
            Leaderboard
          </h1>

          <p className="mt-2 text-slate-400">
            Compete with developers and climb the rankings.
          </p>

        </div>

      </div>

      <section className="grid gap-6 md:grid-cols-3">

        <LeaderboardCard
          title="Participants"
          value={leaderboardStats.totalParticipants}
        />

        <LeaderboardCard
          title="Your Rank"
          value={`#${leaderboardStats.yourRank}`}
        />

        <LeaderboardCard
          title="Your XP"
          value={leaderboardStats.yourXP}
        />

      </section>

      <TopThree />

      <LeaderboardTable />

    </main>
  );
}