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

type Theme = "dark" | "light" | "system";

export default function AppearanceSettings({
  open,
  onClose,
}: Props) {
  const [userId, setUserId] = useState("");
  const [theme, setTheme] = useState<Theme>("dark");
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

      setTheme((data.theme as Theme) || "dark");
    }

    load();
  }, [open]);

  async function save() {
    setSaving(true);

    await updateSettings(userId, {
      theme,
    });

    setSaving(false);

    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 p-8">

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Appearance
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <ThemeButton
            label="🌙 Dark"
            active={theme === "dark"}
            onClick={() => setTheme("dark")}
          />

          <ThemeButton
            label="☀️ Light"
            active={theme === "light"}
            onClick={() => setTheme("light")}
          />

          <ThemeButton
            label="💻 System"
            active={theme === "system"}
            onClick={() => setTheme("system")}
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

interface ThemeButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function ThemeButton({
  label,
  active,
  onClick,
}: ThemeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition ${
        active
          ? "border-indigo-500 bg-indigo-500/20 text-white"
          : "border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >
      {label}
    </button>
  );
}