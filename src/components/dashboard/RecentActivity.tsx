"use client";

export default function RecentActivity() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
      <h2 className="text-2xl font-bold">
        Recent Activity
      </h2>

      <div className="mt-8 rounded-2xl border border-dashed border-slate-700 p-8 text-center">

        <div className="text-5xl">
          🚀
        </div>

        <h3 className="mt-4 text-xl font-semibold">
          Welcome to SkillBridge!
        </h3>

        <p className="mt-2 text-slate-400">
          Your activity will appear here after you start using the platform.
        </p>

        <div className="mt-6 space-y-3 text-left text-slate-300">
          <p>✅ Complete your profile</p>
          <p>✅ Add your first project</p>
          <p>✅ Upload your first certificate</p>
          <p>✅ Add an achievement</p>
        </div>

      </div>
    </section>
  );
}