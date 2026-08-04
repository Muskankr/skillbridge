"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  getSettings,
  updateSettings,
} from "@/features/settings/settingsService";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PrivacySettings({ open, onClose }: Props) {
  const [userId, setUserId] = useState("");

  const [settings, setSettings] = useState({
    profile_public: true,
    show_streak: true,
    show_leaderboard: true,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      if (!open) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUserId(user.id);

      const data = await getSettings(user.id);

      if (!data) return;

      setSettings({
        profile_public: data.profile_public,
        show_streak: data.show_streak,
        show_leaderboard: data.show_leaderboard,
      });
    }

    load();
  }, [open]);

  async function save() {
    setSaving(true);

    await updateSettings(userId, settings);

    setSaving(false);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 p-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Privacy Settings
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">

          <Toggle
            label="Public Profile"
            value={settings.profile_public}
            onChange={(v) =>
              setSettings({
                ...settings,
                profile_public: v,
              })
            }
          />

          <Toggle
            label="Show Streak"
            value={settings.show_streak}
            onChange={(v) =>
              setSettings({
                ...settings,
                show_streak: v,
              })
            }
          />

          <Toggle
            label="Show Leaderboard"
            value={settings.show_leaderboard}
            onChange={(v) =>
              setSettings({
                ...settings,
                show_leaderboard: v,
              })
            }
          />

        </div>

        <button
          onClick={save}
          disabled={saving}
          className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-500"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({
  label,
  value,
  onChange,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
      <p className="text-white">{label}</p>

      <button
        onClick={() => onChange(!value)}
        className={`h-7 w-14 rounded-full transition ${
          value ? "bg-indigo-600" : "bg-slate-600"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white transition ${
            value ? "translate-x-7" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}