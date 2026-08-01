import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileForm from "@/components/profile/ProfileForm";
import DeveloperProfile from "@/components/profile/DeveloperProfile";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="grid gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <ProfileForm />
        </div>

        <div>
          <DeveloperProfile />
        </div>

      </div>
    </DashboardLayout>
  );
}