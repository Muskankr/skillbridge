import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PublicDeveloperProfile from "@/components/profile/PublicDeveloperProfile";

interface Props {
  params: {
    username: string;
  };
}

export default function PublicProfilePage({ params }: Props) {
  return (
    <DashboardLayout>
      <PublicDeveloperProfile username={params.username} />
    </DashboardLayout>
  );
}