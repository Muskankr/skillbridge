export default function AccountOverview() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>

          <h2 className="text-3xl font-black">
            Account Overview
          </h2>

          <p className="mt-2 text-slate-400">
            Manage your SkillBridge account and preferences.
          </p>

        </div>

        <div className="rounded-2xl bg-indigo-600 px-6 py-4">

          <p className="text-sm">
            Current Plan
          </p>

          <h3 className="text-2xl font-bold">
            Free
          </h3>

        </div>

      </div>

    </section>
  );
}