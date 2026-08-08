"use client";

import { useEffect, useState } from "react";

import { useProfile } from "@/features/profile/hooks/useProfile";
import { supabase } from "@/lib/supabase";

import { updateProfile } from "@/features/profile/services/profile.service";
import { uploadAvatar } from "@/features/profile/services/storage.service";

import { calculateProfileCompletion } from "@/features/profile/utils/profileCompletion";
import { calculateCareerScore } from "@/features/profile/utils/careerScore";

import { awardXP } from "@/features/xp/services/xp.service";

export default function ProfileForm() {
  const { profile, loading } = useProfile();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    headline: "",
    college: "",
    branch: "",
    graduation_year: "",
    bio: "",
    github_url: "",
    linkedin_url: "",
    portfolio_url: "",
    location: "",
  });

  useEffect(() => {
    if (!profile) return;

    setFormData({
      full_name: profile.full_name || "",
      username: profile.username || "",
      headline: profile.headline || "",
      college: profile.college || "",
      branch: profile.branch || "",
      graduation_year: profile.graduation_year?.toString() || "",
      bio: profile.bio || "",
      github_url: profile.github_url || "",
      linkedin_url: profile.linkedin_url || "",
      portfolio_url: profile.portfolio_url || "",
      location: profile.location || "",
    });
  }, [profile]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSave() {
    try {
      setSaving(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("User not found.");
        return;
      }

      let avatarUrl = profile?.avatar_url || "";

      // Upload avatar if user selected a new one
      if (avatarFile) {
        const result = await uploadAvatar(user.id, avatarFile);

        if (result.error) {
          alert(result.error.message);
          return;
        }

        avatarUrl = result.publicUrl || avatarUrl;
      }

      // Calculate profile completion
      const profileCompletion = calculateProfileCompletion({
        full_name: formData.full_name,
        username: formData.username,
        headline: formData.headline,
        bio: formData.bio,
        college: formData.college,
        branch: formData.branch,
        graduation_year: formData.graduation_year,
        github_url: formData.github_url,
        linkedin_url: formData.linkedin_url,
        portfolio_url: formData.portfolio_url,
        location: formData.location,
      });

      // Calculate career score
      const careerScore = calculateCareerScore(profileCompletion);

      const { error } = await updateProfile(user.id, {
        full_name: formData.full_name,
        username: formData.username,
        headline: formData.headline,
        bio: formData.bio,
        college: formData.college,
        branch: formData.branch,

        graduation_year: formData.graduation_year
          ? Number(formData.graduation_year)
          : null,

        github_url: formData.github_url,
        linkedin_url: formData.linkedin_url,
        portfolio_url: formData.portfolio_url,
        location: formData.location,

        avatar_url: avatarUrl,

        profile_completion: profileCompletion,
        career_score: careerScore,
      });

      if (error) {
        alert(error.message);
        return;
      }

      // Award XP
      await awardXP(
        user.id,
        100,
        "Completed Profile"
      );

      setAvatarFile(null);

      alert("🎉 Profile updated successfully!");

      // Refresh page so preview immediately shows new data
      window.location.reload();
    } catch (error) {
      console.error("Profile update failed:", error);
      alert("Something went wrong while updating your profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-slate-400">
          Loading Profile...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div>
        <h2 className="text-3xl font-bold text-white">
          Edit Profile
        </h2>

        <p className="mt-2 text-slate-400">
          Complete your developer profile.
        </p>
      </div>

      {/* Avatar */}
      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-indigo-500 bg-indigo-600">
          <img
            src={
              avatarFile
                ? URL.createObjectURL(avatarFile)
                : profile?.avatar_url || "/avatar.png"
            }
            alt="Profile avatar"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <label className="inline-flex cursor-pointer items-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500">
            Upload Avatar

            <input
              hidden
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setAvatarFile(file);
                }
              }}
            />
          </label>

          <p className="mt-2 text-sm text-slate-400">
            JPG, PNG or WEBP
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="headline"
          placeholder="Headline"
          value={formData.headline}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="college"
          placeholder="College"
          value={formData.college}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="graduation_year"
          type="number"
          placeholder="Graduation Year"
          value={formData.graduation_year}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="github_url"
          placeholder="GitHub URL"
          value={formData.github_url}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="linkedin_url"
          placeholder="LinkedIn URL"
          value={formData.linkedin_url}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="portfolio_url"
          placeholder="Portfolio URL"
          value={formData.portfolio_url}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />
      </div>

      {/* Bio */}
      <textarea
        name="bio"
        placeholder="Tell us about yourself..."
        value={formData.bio}
        onChange={handleChange}
        rows={5}
        className="mt-5 w-full resize-none rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
      />

      {/* Save */}
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-7 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}