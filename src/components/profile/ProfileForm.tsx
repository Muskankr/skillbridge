"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { supabase } from "@/lib/supabase";
import { updateProfile } from "@/features/profile/services/profile.service";
import { calculateProfileCompletion } from "@/features/profile/utils/profileCompletion";
import { calculateCareerScore } from "@/features/profile/utils/careerScore";
import { awardXP } from "@/features/xp/services/xp.service";
import { uploadAvatar } from "@/features/profile/services/profile.service";

export default function ProfileForm() {
  const { profile, loading } = useProfile();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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
    if (profile) {
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
    }
  }, [profile]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center text-white">
        Loading Profile...
      </div>
    );
  }

  async function handleSave() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("User not found.");
    return;
  }

  let avatarUrl = profile?.avatar_url || "";

if (avatarFile) {
  avatarUrl = await uploadAvatar(user.id, avatarFile);
}

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

  const careerScore =
    calculateCareerScore(profileCompletion);

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

await awardXP(
  user.id,
  100,
  "Completed Profile"
);

alert("🎉 Profile updated successfully!");
}

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">

      <h1 className="text-3xl font-bold text-white">
        Edit Profile
      </h1>

      <p className="mt-2 text-slate-400">
        Complete your developer profile.
      </p>

      <div className="mt-8 mb-8 flex items-center gap-6">

  <img
    src={
      avatarFile
        ? URL.createObjectURL(avatarFile)
        : profile?.avatar_url || "/avatar.png"
    }
    alt="Avatar"
    className="h-28 w-28 rounded-full border-4 border-indigo-500 object-cover"
  />

  <div>

    <label className="cursor-pointer rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500">

      Upload Avatar

      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.length) {
            setAvatarFile(e.target.files[0]);
          }
        }}
      />

    </label>

    <p className="mt-3 text-sm text-slate-400">
      JPG, PNG or WEBP
    </p>

  </div>

</div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        <input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="headline"
          placeholder="Headline"
          value={formData.headline}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="college"
          placeholder="College"
          value={formData.college}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="branch"
          placeholder="Branch"
          value={formData.branch}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="graduation_year"
          placeholder="Graduation Year"
          value={formData.graduation_year}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="github_url"
          placeholder="GitHub URL"
          value={formData.github_url}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="linkedin_url"
          placeholder="LinkedIn URL"
          value={formData.linkedin_url}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="portfolio_url"
          placeholder="Portfolio URL"
          value={formData.portfolio_url}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white outline-none"
        />

      </div>

      <textarea
        name="bio"
        placeholder="Tell us about yourself..."
        value={formData.bio}
        onChange={handleChange}
        rows={5}
        className="mt-6 w-full rounded-xl bg-slate-800 p-4 text-white outline-none"
      />

      <button
  onClick={handleSave}
  className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-500"
>
  Save Changes
</button>

    </div>
  );
}