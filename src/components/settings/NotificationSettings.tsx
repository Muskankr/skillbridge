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

export default function NotificationSettings({
  open,
  onClose,
}: Props) {
  const [userId, setUserId] = useState("");

  const [settings, setSettings] = useState({
    email_notifications: true,
    push_notifications: true,
    achievement_notifications: true,
    daily_reminder: true,
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
        email_notifications: data.email_notifications,
        push_notifications: data.push_notifications,
        achievement_notifications: data.achievement_notifications,
        daily_reminder: data.daily_reminder,
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
            Notification Settings
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
            label="Email Notifications"
            value={settings.email_notifications}
            onChange={(v) =>
              setSettings({
                ...settings,
                email_notifications: v,
              })
            }
          />

          <Toggle
            label="Push Notifications"
            value={settings.push_notifications}
            onChange={(v) =>
              setSettings({
                ...settings,
                push_notifications: v,
              })
            }
          />

          <Toggle
            label="Achievement Notifications"
            value={settings.achievement_notifications}
            onChange={(v) =>
              setSettings({
                ...settings,
                achievement_notifications: v,
              })
            }
          />

          <Toggle
            label="Daily Reminder"
            value={settings.daily_reminder}
            onChange={(v) =>
              setSettings({
                ...settings,
                daily_reminder: v,
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