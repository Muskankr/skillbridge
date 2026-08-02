"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RecentActivity() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("xp_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      })
      .limit(10);

    setActivities(data || []);
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Recent XP Activity
      </h2>

      <div className="mt-6 space-y-4">

        {activities.length === 0 ? (
          <p className="text-slate-400">
            No XP earned yet.
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between rounded-xl bg-slate-800 p-4"
            >
              <div>
                <p className="font-semibold text-white">
                  {activity.reason}
                </p>

                <p className="text-sm text-slate-400">
                  {new Date(activity.created_at).toLocaleDateString()}
                </p>
              </div>

              <span className="font-bold text-green-400">
                +{activity.points} XP
              </span>
            </div>
          ))
        )}

      </div>

    </section>
  );
}