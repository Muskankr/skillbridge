"use client";

import { Trophy, Users, Medal, Zap } from "lucide-react";

import { useLeaderboard } from "@/features/leaderboard/hooks/useLeaderboard";
import LeaderboardRow from "./LeaderboardRow";

export default function LeaderboardTable() {
  const { users, loading } = useLeaderboard();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-400">
          Loading leaderboard...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* ================= HEADER ================= */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
          LEADERBOARD
        </p>

        <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">
          Climb the developer rankings
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Compete with developers, earn XP, improve your
          career score and climb your way to the top.
        </p>
      </section>

      {/* ================= QUICK STATS ================= */}

      <section className="grid gap-5 sm:grid-cols-3">

        {/* Participants */}

        <div className="rounded-3xl border border-white/10 bg-[#080808] p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Participants
              </p>

              <h2 className="mt-3 text-4xl font-black text-indigo-400">
                {users.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-[#151515]">
              <Users className="h-5 w-5 text-indigo-400" />
            </div>

          </div>

        </div>

        {/* Top Developer */}

        <div className="rounded-3xl border border-white/10 bg-[#080808] p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Top Developer
              </p>

              <h2 className="mt-3 truncate text-2xl font-black text-yellow-400">
                {users.length > 0
                  ? users[0].full_name ||
                    users[0].username ||
                    "Developer"
                  : "-"}
              </h2>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#151515]">
              <Trophy className="h-5 w-5 text-yellow-400" />
            </div>

          </div>

        </div>

        {/* Top XP */}

        <div className="rounded-3xl border border-white/10 bg-[#080808] p-6">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Highest XP
              </p>

              <h2 className="mt-3 text-4xl font-black text-green-400">
                {users.length > 0
                  ? users[0].xp ?? 0
                  : 0}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-[#151515]">
              <Zap className="h-5 w-5 text-green-400" />
            </div>

          </div>

        </div>

      </section>

      {/* ================= LEADERBOARD ================= */}

      <section className="overflow-hidden rounded-3xl border border-white/10 bg-[#080808]">

        {/* Table Header */}

        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-[#151515]">
            <Medal className="h-5 w-5 text-indigo-400" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Developer Rankings
            </h2>

            <p className="text-sm text-slate-500">
              Top developers on SkillBridge
            </p>

          </div>

        </div>

        {/* Responsive Table */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>

              <tr className="border-b border-white/10 bg-[#0d0d0d] text-left text-xs uppercase tracking-wider text-slate-500">

                <th className="px-6 py-4 font-semibold">
                  Rank
                </th>

                <th className="px-6 py-4 font-semibold">
                  Developer
                </th>

                <th className="px-6 py-4 font-semibold">
                  Level
                </th>

                <th className="px-6 py-4 font-semibold">
                  Streak
                </th>

                <th className="px-6 py-4 font-semibold">
                  Career Score
                </th>

                <th className="px-6 py-4 font-semibold">
                  XP
                </th>

              </tr>

            </thead>

            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center"
                  >

                    <Trophy className="mx-auto h-10 w-10 text-slate-700" />

                    <p className="mt-4 font-semibold text-slate-400">
                      No developers on the leaderboard yet.
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      Start earning XP to appear here.
                    </p>

                  </td>

                </tr>

              ) : (

                users.map((user, index) => (

                  <LeaderboardRow
                    key={user.id}
                    rank={index + 1}
                    user={user}
                  />

                ))

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}