"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  Zap,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

interface XPActivity {
  id: string;
  reason: string;
  points: number;
  created_at: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<XPActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  async function loadActivities() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const {
        data,
        error,
      } = await supabase
        .from("xp_history")
        .select(
          "id, reason, points, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(10);

      if (error) {
        console.error(
          "Failed to load XP history:",
          error
        );

        return;
      }

      setActivities(data || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#080808] p-6 md:p-8">

      {/* HEADER */}

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-[#151515]">
          <Zap className="h-5 w-5 text-indigo-400" />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Recent XP Activity
          </h2>

          <p className="text-sm text-slate-500">
            Your latest XP earnings
          </p>

        </div>

      </div>

      {/* ACTIVITIES */}

      <div className="mt-6 space-y-3">

        {loading ? (
          <div className="py-8 text-center">
            <p className="text-slate-400">
              Loading activity...
            </p>
          </div>
        ) : activities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">

            <Zap className="mx-auto h-8 w-8 text-slate-600" />

            <p className="mt-3 font-medium text-slate-400">
              No XP earned yet.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Complete activities to start earning XP.
            </p>

          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-[#111111] p-4 transition hover:border-white/10 hover:bg-[#151515]"
            >

              {/* LEFT */}

              <div className="flex min-w-0 items-center gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-[#151515]">
                  <Zap className="h-5 w-5 text-green-400" />
                </div>

                <div className="min-w-0">

                  <p className="truncate font-semibold text-white">
                    {activity.reason}
                  </p>

                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">

                    <Clock className="h-3.5 w-3.5" />

                    <span>
                      {new Date(
                        activity.created_at
                      ).toLocaleDateString()}
                    </span>

                  </div>

                </div>

              </div>

              {/* XP */}

              <span className="shrink-0 font-bold text-green-400">
                +{activity.points} XP
              </span>

            </div>
          ))
        )}

      </div>

    </section>
  );
}