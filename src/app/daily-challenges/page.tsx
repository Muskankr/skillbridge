import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ChallengeDashboard from "@/components/challenges/ChallengeDashboard";

export default function DailyChallengesPage() {
  return (
    <DashboardLayout>
      <ChallengeDashboard />
    </DashboardLayout>
  );
}