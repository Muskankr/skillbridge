"use client";

import { useEffect, useState } from "react";
import { X, Shield } from "lucide-react";

import { supabase } from "@/lib/supabase";

import {
  getSettings,
  updateSettings,
} from "@/features/settings/settingsService";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface PrivacyState {
  profile_public: boolean;
  show_streak: boolean;
  show_leaderboard: boolean;
}

export default function PrivacySettings({
  open,
  onClose,
}: Props) {
  const [userId, setUserId] = useState("");

  const [settings, setSettings] = useState<PrivacyState>({
    profile_public: true,
    show_streak: true,
    show_leaderboard: true,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function loadSettings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);

      const data = await getSettings(user.id);

      if (!data) return;

      setSettings({
        profile_public: data.profile_public ?? true,
        show_streak: data.show_streak ?? true,
        show_leaderboard: data.show_leaderboard ?? true,
      });
    }

    loadSettings();
  }, [open]);

  async function save() {
    if (!userId) {
      alert("User not found.");
      return;
    }

    setSaving(true);

    try {
      await updateSettings(userId, settings);

      alert("Privacy settings updated successfully!");

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update privacy settings.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl sm:p-8">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Shield className="h-5 w-5 text-zinc-300" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Privacy Settings
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Options */}
        <div className="mt-8 space-y-3">

          <Toggle
            label="Public Profile"
            description="Allow other people to view your profile."
            value={settings.profile_public}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                profile_public: value,
              }))
            }
          />

          <Toggle
            label="Show Streak"
            description="Show your coding streak on your public profile."
            value={settings.show_streak}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                show_streak: value,
              }))
            }
          />

          <Toggle
            label="Show Leaderboard"
            description="Allow your profile to appear on the leaderboard."
            value={settings.show_leaderboard}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                show_leaderboard: value,
              }))
            }
          />

        </div>

        {/* Save */}
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="mt-6 w-full rounded-xl bg-white py-3.5 font-bold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}

/* Toggle */

interface ToggleProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({
  label,
  description,
  value,
  onChange,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-zinc-900 p-4">

      <div>
        <h3 className="font-semibold text-white">
          {label}
        </h3>

        <p className="mt-1 text-sm leading-5 text-zinc-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className={`relative h-7 w-14 shrink-0 rounded-full transition-colors duration-200 ${
          value
            ? "bg-white"
            : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full shadow-md transition-transform duration-200 ${
            value
              ? "translate-x-7 bg-black"
              : "translate-x-0 bg-zinc-400"
          }`}
        />
      </button>

    </div>
  );
}