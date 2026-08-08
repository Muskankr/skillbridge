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

interface FormData {
  title: string;
  organization: string;
  description: string;
  achievement_date: string;
  proof_url: string;
  image_url: string;
  badge: string;
}

const emptyForm: FormData = {
  title: "",
  organization: "",
  description: "",
  achievement_date: "",
  proof_url: "",
  image_url: "",
  badge: "",
};

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

export default function AchievementForm({
  onCreated,
  onCancel,
}: Props) {
  const [formData, setFormData] =
    useState<FormData>(emptyForm);

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    const title = formData.title.trim();
    const organization =
      formData.organization.trim();
    const description =
      formData.description.trim();
    const achievementDate =
      formData.achievement_date;
    const proofUrl =
      formData.proof_url.trim();
    const imageUrl =
      formData.image_url.trim();
    const badge = formData.badge.trim();

    // Required fields
    if (!title) {
      alert("Please enter an achievement title.");
      return;
    }

    if (!organization) {
      alert("Please enter the organization.");
      return;
    }

    if (!achievementDate) {
      alert(
        "Please select the achievement date."
      );
      return;
    }

    // Length validation
    if (title.length > 150) {
      alert(
        "Achievement title must be 150 characters or less."
      );
      return;
    }

    if (organization.length > 150) {
      alert(
        "Organization name must be 150 characters or less."
      );
      return;
    }

    if (description.length > 1000) {
      alert(
        "Description must be 1000 characters or less."
      );
      return;
    }

    // Proof URL
    if (proofUrl && !isValidUrl(proofUrl)) {
      alert(
        "Please enter a valid proof URL starting with https://"
      );
      return;
    }

    // Image URL
    if (imageUrl && !isValidUrl(imageUrl)) {
      alert(
        "Please enter a valid image URL starting with https://"
      );
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
        title,
        organization,
        description,
        achievement_date: achievementDate,
        proof_url: proofUrl,
        image_url: imageUrl,
        badge,
      });

      if (error) {
        console.error(
          "Achievement database error:",
          error
        );

        alert(error.message);
        return;
      }

      // Secure XP reward.
      // The database decides the XP amount.
      const xpResult = await awardXP(
        user.id,
        "achievement"
      );

      if (!xpResult.success) {
        console.error(
          "Achievement XP error:",
          xpResult.error
        );
      }

      alert(
        "🎉 Achievement added successfully!"
      );

      setFormData(emptyForm);

      onCreated();
    } catch (error) {
      console.error(
        "Achievement submission error:",
        error
      );

      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#080808] p-6">
      {/* Header */}
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
          disabled={loading}
          className="rounded-xl p-2 text-slate-500 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Form */}
      <div className="mt-8 grid gap-5">
        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Achievement Title *
          </label>

          <input
            name="title"
            placeholder="e.g. Hackathon Winner"
            value={formData.title}
            onChange={handleChange}
            maxLength={150}
            required
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Organization *
          </label>

          <input
            name="organization"
            placeholder="e.g. Google, Microsoft, College"
            value={formData.organization}
            onChange={handleChange}
            maxLength={150}
            required
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Achievement Date *
          </label>

          <input
            type="date"
            name="achievement_date"
            value={formData.achievement_date}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Badge Name
          </label>

          <input
            name="badge"
            placeholder="e.g. Gold, Winner, Top Contributor"
            value={formData.badge}
            onChange={handleChange}
            maxLength={100}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Proof URL
          </label>

          <input
            type="url"
            name="proof_url"
            placeholder="https://..."
            value={formData.proof_url}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Image URL
          </label>

          <input
            type="url"
            name="image_url"
            placeholder="https://..."
            value={formData.image_url}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Description
          </label>

          <textarea
            name="description"
            rows={5}
            maxLength={1000}
            placeholder="Describe your achievement..."
            value={formData.description}
            onChange={handleChange}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0d0d0d] p-4 text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Buttons */}
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