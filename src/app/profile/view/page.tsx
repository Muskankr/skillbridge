import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DeveloperProfile from "@/components/profile/DeveloperProfile";

export default function ProfileViewPage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl">
        <DeveloperProfile />
      </div>
    </DashboardLayout>
  );
}