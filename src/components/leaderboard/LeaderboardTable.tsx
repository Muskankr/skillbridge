"use client";

import { Trophy } from "lucide-react";
import { useLeaderboard } from "@/features/leaderboard/hooks/useLeaderboard";

export default function LeaderboardTable() {
  const { users, loading } = useLeaderboard();

  if (loading)
    return (
      <p className="text-white">
        Loading...
      </p>
    );

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

      <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold text-white">
        <Trophy className="text-yellow-400" />
        Leaderboard
      </h1>

      <div className="space-y-4">

        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-2xl bg-slate-800 p-5"
          >
            <div>
              <p className="font-bold text-white">
                #{index + 1}
              </p>

              <p className="text-lg">
                {user.full_name}
              </p>

              <p className="text-slate-400">
                @{user.username}
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-black text-indigo-400">
                {user.xp}
              </p>

              <p className="text-slate-400">
                XP
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}