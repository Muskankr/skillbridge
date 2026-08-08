"use client";

import {
  useEffect,
  useState,
} from "react";

import { useProfile } from "@/features/profile/hooks/useProfile";
import { supabase } from "@/lib/supabase";

import { updateProfile } from "@/features/profile/services/profile.service";
import { uploadAvatar } from "@/features/profile/services/storage.service";

import { calculateProfileCompletion } from "@/features/profile/utils/profileCompletion";
import { calculateCareerScore } from "@/features/profile/utils/careerScore";

import { awardXP } from "@/features/xp/services/xp.service";

interface FormData {
  full_name: string;
  username: string;
  headline: string;
  college: string;
  branch: string;
  graduation_year: string;
  bio: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  location: string;
}

const emptyForm: FormData = {
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

export default function ProfileForm() {
  const { profile, loading } = useProfile();

  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] =
    useState<FormData>(emptyForm);

  useEffect(() => {
    if (!profile) return;

    setFormData({
      full_name: profile.full_name || "",
      username: profile.username || "",
      headline: profile.headline || "",
      college: profile.college || "",
      branch: profile.branch || "",
      graduation_year:
        profile.graduation_year?.toString() || "",
      bio: profile.bio || "",
      github_url: profile.github_url || "",
      linkedin_url:
        profile.linkedin_url || "",
      portfolio_url:
        profile.portfolio_url || "",
      location: profile.location || "",
    });
  }, [profile]);

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

      const fullName =
        formData.full_name.trim();
      const username =
        formData.username.trim();
      const headline =
        formData.headline.trim();
      const college =
        formData.college.trim();
      const branch =
        formData.branch.trim();
      const bio =
        formData.bio.trim();
      const githubUrl =
        formData.github_url.trim();
      const linkedinUrl =
        formData.linkedin_url.trim();
      const portfolioUrl =
        formData.portfolio_url.trim();
      const location =
        formData.location.trim();

      // Basic validation
      if (!fullName) {
        alert("Please enter your full name.");
        return;
      }

      if (!username) {
        alert("Please enter a username.");
        return;
      }

      if (!headline) {
        alert("Please enter a headline.");
        return;
      }

      if (!college) {
        alert("Please enter your college.");
        return;
      }

      if (!branch) {
        alert("Please enter your branch.");
        return;
      }

      // Length validation
      if (fullName.length > 100) {
        alert(
          "Full name must be 100 characters or less."
        );
        return;
      }

      if (username.length > 50) {
        alert(
          "Username must be 50 characters or less."
        );
        return;
      }

      if (headline.length > 150) {
        alert(
          "Headline must be 150 characters or less."
        );
        return;
      }

      if (bio.length > 1000) {
        alert(
          "Bio must be 1000 characters or less."
        );
        return;
      }

      // Graduation year
      let graduationYear: number | null = null;

      if (formData.graduation_year.trim()) {
        const parsedYear = Number(
          formData.graduation_year
        );

        if (
          !Number.isInteger(parsedYear) ||
          parsedYear < 2020 ||
          parsedYear > 2100
        ) {
          alert(
            "Please enter a valid graduation year."
          );
          return;
        }

        graduationYear = parsedYear;
      }

      // URL validation
      if (
        githubUrl &&
        !isValidUrl(githubUrl)
      ) {
        alert(
          "Please enter a valid GitHub URL."
        );
        return;
      }

      if (githubUrl) {
        const github = new URL(githubUrl);

        if (
          github.hostname !== "github.com" &&
          github.hostname !==
            "www.github.com"
        ) {
          alert(
            "GitHub URL must point to github.com."
          );
          return;
        }
      }

      if (
        linkedinUrl &&
        !isValidUrl(linkedinUrl)
      ) {
        alert(
          "Please enter a valid LinkedIn URL."
        );
        return;
      }

      if (linkedinUrl) {
        const linkedin =
          new URL(linkedinUrl);

        if (
          linkedin.hostname !==
            "linkedin.com" &&
          linkedin.hostname !==
            "www.linkedin.com"
        ) {
          alert(
            "LinkedIn URL must point to linkedin.com."
          );
          return;
        }
      }

      if (
        portfolioUrl &&
        !isValidUrl(portfolioUrl)
      ) {
        alert(
          "Please enter a valid portfolio URL."
        );
        return;
      }

      let avatarUrl =
        profile?.avatar_url || "";

      // Upload avatar
      if (avatarFile) {
        const result =
          await uploadAvatar(
            user.id,
            avatarFile
          );

        if (result.error) {
          alert(result.error.message);
          return;
        }

        avatarUrl =
          result.publicUrl || avatarUrl;
      }

      // Profile completion
      const profileCompletion =
        calculateProfileCompletion({
          full_name: fullName,
          username,
          headline,
          bio,
          college,
          branch,
          graduation_year:
            formData.graduation_year,
          github_url: githubUrl,
          linkedin_url: linkedinUrl,
          portfolio_url: portfolioUrl,
          location,
        });

      // Career score
      const careerScore =
        calculateCareerScore(
          profileCompletion
        );

      const { error } =
        await updateProfile(
          user.id,
          {
            full_name: fullName,
            username,
            headline,
            bio,
            college,
            branch,
            graduation_year:
              graduationYear,
            github_url: githubUrl,
            linkedin_url: linkedinUrl,
            portfolio_url:
              portfolioUrl,
            location,
            avatar_url: avatarUrl,
            profile_completion:
              profileCompletion,
            career_score:
              careerScore,
          }
        );

      if (error) {
        console.error(
          "Profile update error:",
          error
        );

        alert(error.message);
        return;
      }

      /*
       * Secure XP reward.
       *
       * The database decides:
       * - whether this reward is allowed
       * - whether it was already given
       * - how many XP it is worth
       */
      const xpResult = await awardXP(
        user.id,
        "profile_completed"
      );

      if (!xpResult.success) {
        console.error(
          "Profile XP error:",
          xpResult.error
        );
      }

      setAvatarFile(null);

      alert(
        "🎉 Profile updated successfully!"
      );

      window.location.reload();
    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );

      alert(
        "Something went wrong while updating your profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-slate-400">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#080808] p-6">
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
                ? URL.createObjectURL(
                    avatarFile
                  )
                : profile?.avatar_url ||
                  "/avatar.png"
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
                const file =
                  e.target.files?.[0];

                if (!file) return;

                if (file.size > 5 * 1024 * 1024) {
                  alert(
                    "Avatar must be smaller than 5MB."
                  );
                  return;
                }

                setAvatarFile(file);
              }}
            />
          </label>

          <p className="mt-2 text-sm text-slate-400">
            JPG, PNG or WEBP · Max 5MB
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
          maxLength={100}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          maxLength={50}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="headline"
          placeholder="Headline"
          value={formData.headline}
          onChange={handleChange}
          maxLength={150}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="college"
          placeholder="College"
          value={formData.college}
          onChange={handleChange}
          maxLength={150}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          maxLength={100}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="graduation_year"
          type="number"
          placeholder="Graduation Year"
          value={formData.graduation_year}
          onChange={handleChange}
          min={2020}
          max={2100}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="github_url"
          type="url"
          placeholder="GitHub URL"
          value={formData.github_url}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="linkedin_url"
          type="url"
          placeholder="LinkedIn URL"
          value={formData.linkedin_url}
          onChange={handleChange}
          className="w-full rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
        />

        <input
          name="portfolio_url"
          type="url"
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
          maxLength={150}
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
        maxLength={1000}
        className="mt-5 w-full resize-none rounded-xl border border-white/5 bg-slate-800 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-indigo-500"
      />

      {/* Save */}
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-7 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : "Save Changes"}
      </button>
    </div>
  );
}