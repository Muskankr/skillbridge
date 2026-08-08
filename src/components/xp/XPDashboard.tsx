"use client";

import {
  Flame,
  Trophy,
  Zap,
  TrendingUp,
} from "lucide-react";

import { useXP } from "@/features/xp/hooks/useXP";
import XPCard from "./XPCard";
import RecentActivity from "./RecentActivity";

export default function XPDashboard() {
  const {
    xp,
    level,
    nextLevel,
    progress,
    loading,
  } = useXP();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-slate-400">Loading XP...</p>
      </div>
    );
  }

  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      {/* ================= HEADER ================= */}

      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
          XP SYSTEM
        </p>

        <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">
          Level up your developer journey
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Earn XP by completing activities, building
          projects, improving your profile and staying
          consistent.
        </p>
      </section>

      {/* ================= MAIN XP CARD ================= */}

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#080808] p-6 md:p-8">

        {/* Subtle background decoration */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-600/5 blur-3xl" />

        <div className="relative">

          {/* TOP */}

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

            {/* Total XP */}

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#151515]">
                <Zap className="h-7 w-7 text-indigo-400" />
              </div>

              <div>
                <p className="text-sm text-slate-400">
                  Total XP
                </p>

                <h2 className="mt-1 text-5xl font-black text-indigo-400">
                  {xp}
                </h2>
              </div>

            </div>

            {/* Current Level */}

            <div className="rounded-2xl border border-white/5 bg-[#111111] px-7 py-4 text-center">

              <p className="text-sm text-slate-400">
                Current Level
              </p>

              <p className="mt-1 text-4xl font-black text-yellow-400">
                {level}
              </p>

            </div>

          </div>

          {/* PROGRESS */}

          <div className="mt-10">

            <div className="mb-3 flex items-end justify-between gap-4">

              <div>

                <p className="font-semibold text-white">
                  Progress to Level {level + 1}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Keep earning XP to unlock the next level.
                </p>

              </div>

              <span className="font-bold text-indigo-400">
                {Math.round(safeProgress)}%
              </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-700"
                style={{
                  width: `${safeProgress}%`,
                }}
              />

            </div>

          </div>

        </div>
      </section>

      {/* ================= XP STATS ================= */}

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <XPCard
          title="Total XP"
          value={xp}
          icon={<Zap className="h-5 w-5" />}
          color="indigo"
        />

        <XPCard
          title="Current Level"
          value={level}
          icon={<Trophy className="h-5 w-5" />}
          color="yellow"
        />

        <XPCard
          title="Next Level"
          value={nextLevel}
          icon={<TrendingUp className="h-5 w-5" />}
          color="green"
        />

        <XPCard
          title="Progress"
          value={`${Math.round(safeProgress)}%`}
          icon={<Flame className="h-5 w-5" />}
          color="pink"
        />

      </section>

      {/* ================= RECENT ACTIVITY ================= */}

      <RecentActivity />

    </div>
  );
}