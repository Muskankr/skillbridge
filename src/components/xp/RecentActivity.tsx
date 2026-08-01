import { recentActivities } from "@/constants/xp";

export default function RecentActivity() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">

      <h2 className="text-2xl font-bold">
        Recent XP Activity
      </h2>

      <div className="mt-6 space-y-4">

        {recentActivities.map((activity) => (

          <div
            key={activity.title}
            className="flex items-center justify-between rounded-xl bg-slate-800/50 p-4"
          >

            <p>{activity.title}</p>

            <span className="font-bold text-green-400">
              {activity.xp}
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}