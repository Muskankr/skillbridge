"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";

import {
  getStreak,
  updateStreak,
} from "@/features/streak/streakService";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CareerScore from "@/components/dashboard/CareerScore";
import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import LevelCard from "@/components/dashboard/LevelCard";
import StreakCard from "@/components/dashboard/StreakCard";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [streak, setStreak] = useState({
    streak: 1,
    longest_streak: 1,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    async function loadStreak() {
      if (!user) return;

      try {
        await updateStreak(user.id);

        const data = await getStreak(user.id);

        if (data) {
          setStreak({
            streak: data.streak,
            longest_streak: data.longest_streak,
          });
        }
      } catch (error) {
        console.error(
          "Failed to load streak:",
          error
        );
      }
    }

    if (user) {
      loadStreak();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-sm text-zinc-500">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
            Overview
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
            Your Developer Dashboard
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Track your progress, build your profile and
            keep moving forward.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

          {/* Left */}
          <div className="space-y-6">
            <CareerScore />

            <OverviewCards />

            <QuickActions />

            <RecentActivity />
          </div>

          {/* Right */}
          <div className="space-y-6">
            <LevelCard />

            <StreakCard
              streak={streak.streak}
              longestStreak={
                streak.longest_streak
              }
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}