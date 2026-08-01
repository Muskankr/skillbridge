import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <DashboardLayout>
      <LeaderboardTable />
    </DashboardLayout>
  );
}