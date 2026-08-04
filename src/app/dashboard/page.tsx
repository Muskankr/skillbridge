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

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // Load streak after login
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
        console.error("Failed to load streak:", error);
      }
    }

    if (user) {
      loadStreak();
    }
  }, [user]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading Dashboard...
      </main>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side */}
        <div className="space-y-8 lg:col-span-2">
          <CareerScore />
          <OverviewCards />
          <QuickActions />
          <RecentActivity />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <LevelCard />

          <StreakCard
            streak={streak.streak}
            longestStreak={streak.longest_streak}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}