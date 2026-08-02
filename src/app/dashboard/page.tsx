"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";

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
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading Dashboard...
      </main>
    );
  }

  

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <CareerScore />
        <LevelCard />
        <OverviewCards />
        <QuickActions />
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}