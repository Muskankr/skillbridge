"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { addAchievement } from "@/features/achievements/services/achievement.service";

export default function AchievementForm() {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      setLoading(false);
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

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("🎉 Achievement Added!");

    setFormData({
      title: "",
      organization: "",
      description: "",
      achievement_date: "",
      proof_url: "",
      image_url: "",
      badge: "",
    });

    window.location.reload();
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">

      <h1 className="text-3xl font-bold text-white">
        Add Achievement
      </h1>

      <p className="mt-2 text-slate-400">
        Showcase your awards and accomplishments.
      </p>

      <div className="mt-8 grid gap-6">

        <input
          name="title"
          placeholder="Achievement Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="organization"
          placeholder="Organization"
          value={formData.organization}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          type="date"
          name="achievement_date"
          value={formData.achievement_date}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="badge"
          placeholder="Badge Name"
          value={formData.badge}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="proof_url"
          placeholder="Proof URL"
          value={formData.proof_url}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="image_url"
          placeholder="Achievement Image URL"
          value={formData.image_url}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <textarea
          name="description"
          rows={5}
          placeholder="Describe your achievement..."
          value={formData.description}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Achievement"}
        </button>

      </div>

    </div>
  );
}