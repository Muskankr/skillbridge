import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CareerScore from "@/components/dashboard/CareerScore";
import OverviewCards from "@/components/dashboard/OverviewCards";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";

import XPCard from "@/components/dashboard/XPCard";
import StreakCard from "@/components/dashboard/StreakCard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="grid gap-6 lg:grid-cols-3">
          <CareerScore />
          <XPCard xp={250} />
          <StreakCard streak={7} />
        </div>

        <OverviewCards />

        <QuickActions />

        <RecentActivity />

      </div>
    </DashboardLayout>
  );
}