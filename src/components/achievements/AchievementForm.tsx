"use client";

import { useState } from "react";
import { X, Trophy, Save } from "lucide-react";

import { supabase } from "@/lib/supabase";

import { addAchievement } from "@/features/achievements/services/achievement.service";
import { awardXP } from "@/features/xp/services/xp.service";

interface Props {
  onCreated: () => void;
  onCancel: () => void;
}

export default function AchievementForm({
  onCreated,
  onCancel,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    description: "",
    achievement_date: "",
    proof_url: "",
    image_url: "",
    badge: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit() {
    if (!formData.title.trim()) {
      alert("Please enter an achievement title.");
      return;
    }

    if (!formData.organization.trim()) {
      alert("Please enter the organization.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first.");
        return;
      }

      const { error } = await addAchievement({
        user_id: user.id,
        title: formData.title,
        organization: formData.organization,
        description: formData.description,
        achievement_date: formData.achievement_date,
        proof_url: formData.proof_url,
        image_url: formData.image_url,
        badge: formData.badge,
      });

      if (error) {
        alert(error.message);
        return;
      }

      // Award XP for adding an achievement
      try {
        await awardXP(
          user.id,
          25,
          "Added Achievement"
        );
      } catch (xpError) {
        console.error(
          "Achievement XP error:",
          xpError
        );
      }

      alert("🎉 Achievement Added Successfully!");

      setFormData({
        title: "",
        organization: "",
        description: "",
        achievement_date: "",
        proof_url: "",
        image_url: "",
        badge: "",
      });

      // Close form + refresh achievements
      onCreated();

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>

      {/* ================= FORM HEADER ================= */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10">
            <Trophy className="h-6 w-6 text-indigo-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Add Achievement
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showcase your awards and accomplishments.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

      </div>

      {/* ================= FORM ================= */}

      <div className="mt-8 grid gap-5">

        <input
          name="title"
          placeholder="Achievement Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
        />

        <input
          name="organization"
          placeholder="Organization"
          value={formData.organization}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
        />

        <input
          type="date"
          name="achievement_date"
          value={formData.achievement_date}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white outline-none transition focus:border-indigo-500"
        />

        <input
          name="badge"
          placeholder="Badge Name"
          value={formData.badge}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
        />

        <input
          name="proof_url"
          placeholder="Proof URL"
          value={formData.proof_url}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
        />

        <input
          name="image_url"
          placeholder="Achievement Image URL"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
        />

        <textarea
          name="description"
          rows={5}
          placeholder="Describe your achievement..."
          value={formData.description}
          onChange={handleChange}
          className="w-full resize-none rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
        />

      </div>

      {/* ================= BUTTONS ================= */}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="h-5 w-5" />

          {loading
            ? "Saving..."
            : "Save Achievement"}
        </button>

      </div>

    </div>
  );
}