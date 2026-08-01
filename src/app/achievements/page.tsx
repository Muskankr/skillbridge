"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AchievementForm from "@/components/achievements/AchievementForm";

export default function AchievementsPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl">
        <AchievementForm />
      </div>
    </DashboardLayout>
  );
}