"use client";

import { useEffect, useState } from "react";
import { Bell, Mail, Smartphone, Trophy, Clock, X } from "lucide-react";

import { supabase } from "@/lib/supabase";
import {
  getSettings,
  updateSettings,
} from "@/features/settings/settingsService";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface NotificationState {
  email_notifications: boolean;
  push_notifications: boolean;
  achievement_notifications: boolean;
  daily_reminder: boolean;
}

export default function NotificationSettings({
  open,
  onClose,
}: Props) {
  const [userId, setUserId] = useState("");
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] =
    useState<NotificationState>({
      email_notifications: true,
      push_notifications: true,
      achievement_notifications: true,
      daily_reminder: true,
    });

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
        email_notifications:
          data.email_notifications ?? true,

        push_notifications:
          data.push_notifications ?? true,

        achievement_notifications:
          data.achievement_notifications ?? true,

        daily_reminder:
          data.daily_reminder ?? true,
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

      alert("Notification settings updated successfully!");

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update notification settings.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">

      {/* Modal */}
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-black p-6 shadow-2xl sm:p-8">

        {/* Header */}
        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
              <Bell className="h-6 w-6 text-violet-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Manage how SkillBridge keeps you updated.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Divider */}
        <div className="my-7 h-px bg-white/10" />

        {/* Settings */}
        <div className="space-y-3">

          <NotificationToggle
            icon={<Mail className="h-5 w-5" />}
            label="Email Notifications"
            description="Receive important updates and account notifications."
            value={settings.email_notifications}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                email_notifications: value,
              }))
            }
          />

          <NotificationToggle
            icon={<Smartphone className="h-5 w-5" />}
            label="Push Notifications"
            description="Receive notifications directly inside SkillBridge."
            value={settings.push_notifications}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                push_notifications: value,
              }))
            }
          />

          <NotificationToggle
            icon={<Trophy className="h-5 w-5" />}
            label="Achievement Notifications"
            description="Get notified when you unlock XP, levels or achievements."
            value={settings.achievement_notifications}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                achievement_notifications: value,
              }))
            }
          />

          <NotificationToggle
            icon={<Clock className="h-5 w-5" />}
            label="Daily Reminder"
            description="Receive a reminder to continue your developer journey."
            value={settings.daily_reminder}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                daily_reminder: value,
              }))
            }
          />

        </div>

        {/* Save Button */}
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="mt-7 w-full rounded-xl bg-violet-600 py-3.5 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}

/* =====================================================
   NOTIFICATION TOGGLE
===================================================== */

interface NotificationToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function NotificationToggle({
  icon,
  label,
  description,
  value,
  onChange,
}: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-white/10 bg-zinc-950 p-4 transition hover:border-white/20">

      {/* Left */}
      <div className="flex min-w-0 items-center gap-4">

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
            value
              ? "bg-violet-500/10 text-violet-400"
              : "bg-white/5 text-zinc-500"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0">

          <h3 className="font-semibold text-white">
            {label}
          </h3>

          <p className="mt-1 text-sm leading-5 text-zinc-500">
            {description}
          </p>

        </div>

      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-label={`Toggle ${label}`}
        aria-pressed={value}
        className={`relative h-7 w-14 shrink-0 rounded-full transition-colors duration-200 ${
          value
            ? "bg-violet-600"
            : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
            value
              ? "translate-x-7"
              : "translate-x-0"
          }`}
        />
      </button>

    </div>
  );
}