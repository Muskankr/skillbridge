import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileForm from "@/components/profile/ProfileForm";
import DeveloperProfile from "@/components/profile/DeveloperProfile";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Profile
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            Build your developer identity
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Complete your profile, showcase your work and create a
            professional identity that recruiters can discover.
          </p>
        </div>

        {/* Edit + Preview */}
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          {/* Left */}
          <section className="min-w-0 rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl md:p-8">
            <ProfileForm />
          </section>

          {/* Right */}
          <aside className="min-w-0">
            <DeveloperProfile />
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}