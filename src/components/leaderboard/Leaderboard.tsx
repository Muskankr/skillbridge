"use client";

import { useLeaderboard } from "@/features/leaderboard/hooks/useLeaderboard";
import LeaderboardRow from "./LeaderboardRow";

export default function Leaderboard() {

  const { users, loading } = useLeaderboard();

  if (loading) {
    return (
      <p className="text-white">
        Loading leaderboard...
      </p>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-black text-white">
        Leaderboard
      </h1>

      <p className="mt-2 text-slate-400">
        Top developers on SkillBridge
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10 text-slate-400">

              <th className="p-5 text-left">
                Rank
              </th>

              <th className="p-5 text-left">
                Developer
              </th>

              <th className="p-5 text-left">
                Level
              </th>

              <th className="p-5 text-left">
                Streak
              </th>

              <th className="p-5 text-left">
                Career Score
              </th>

              <th className="p-5 text-left">
                XP
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user, index) => (
              <LeaderboardRow
                key={user.id}
                rank={index + 1}
                user={user}
              />
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}