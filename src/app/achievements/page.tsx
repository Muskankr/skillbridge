"use client";

import { useEffect, useState } from "react";
import { Plus, Trophy, Calendar, ExternalLink } from "lucide-react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AchievementForm from "@/components/achievements/AchievementForm";

import { supabase } from "@/lib/supabase";

interface Achievement {
  id: string;
  title: string;
  organization: string;
  description: string;
  achievement_date: string;
  proof_url: string;
  image_url: string;
  badge: string;
}

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  async function loadAchievements() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("achievements")
        .select(
          `
          id,
          title,
          organization,
          description,
          achievement_date,
          proof_url,
          image_url,
          badge
        `
        )
        .eq("user_id", user.id)
        .order("achievement_date", {
          ascending: false,
        });

      if (error) {
        console.error("Failed to load achievements:", error);
        return;
      }

      setAchievements(data || []);
    } catch (error) {
      console.error("Failed to load achievements:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAchievements();
  }, []);

  function handleCreated() {
    setShowForm(false);
    loadAchievements();
  }

  return (
    <DashboardLayout>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">

        {/* ================= HEADER ================= */}
        <section className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
              ACHIEVEMENTS
            </p>

            <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">
              Your achievements
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Showcase your awards, accomplishments and milestones.
            </p>
          </div>

          {/* ADD BUTTON */}
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            <Plus className="h-5 w-5" />

            {showForm
              ? "Close Form"
              : "Add Achievement"}
          </button>

        </section>

        {/* ================= ADD FORM ================= */}
        {showForm && (
          <section className="mt-8 rounded-3xl border border-white/10 bg-[#090909] p-6 md:p-8">

            <AchievementForm
              onCreated={handleCreated}
              onCancel={() => setShowForm(false)}
            />

          </section>
        )}

        {/* ================= ACHIEVEMENTS ================= */}
        <section className="mt-10">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Your Achievements
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {achievements.length} achievement
                {achievements.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-[#090909] p-10 text-center">
              <p className="text-slate-400">
                Loading achievements...
              </p>
            </div>
          ) : achievements.length === 0 ? (

            /* EMPTY STATE */
            <div className="rounded-3xl border border-dashed border-white/10 bg-[#090909] p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
                <Trophy className="h-8 w-8 text-indigo-400" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">
                No achievements yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-slate-500">
                Add your first achievement and start building
                your developer profile.
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                <Plus className="h-5 w-5" />
                Add Achievement
              </button>

            </div>

          ) : (

            /* ACHIEVEMENT GRID */
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {achievements.map((achievement) => (
                <article
                  key={achievement.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-[#090909] transition hover:border-white/20"
                >

                  {/* IMAGE */}
                  {achievement.image_url ? (
                    <div className="h-48 w-full overflow-hidden bg-[#111]">
                      <img
                        src={achievement.image_url}
                        alt={achievement.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-[#0d0d0d]">
                      <Trophy className="h-14 w-14 text-indigo-400/50" />
                    </div>
                  )}

                  <div className="p-6">

                    {/* BADGE */}
                    {achievement.badge && (
                      <span className="inline-flex rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                        {achievement.badge}
                      </span>
                    )}

                    {/* TITLE */}
                    <h3 className="mt-4 text-xl font-bold text-white">
                      {achievement.title}
                    </h3>

                    {/* ORGANIZATION */}
                    <p className="mt-2 font-medium text-indigo-400">
                      {achievement.organization}
                    </p>

                    {/* DESCRIPTION */}
                    {achievement.description && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
                        {achievement.description}
                      </p>
                    )}

                    {/* DATE */}
                    {achievement.achievement_date && (
                      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="h-4 w-4" />

                        <span>
                          {new Date(
                            achievement.achievement_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {/* PROOF */}
                    {achievement.proof_url && (
                      <a
                        href={achievement.proof_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
                      >
                        View Proof
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}

                  </div>
                </article>
              ))}

            </div>
          )}

        </section>
      </main>
    </DashboardLayout>
  );
}