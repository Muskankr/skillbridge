"use client";

import { useEffect, useState } from "react";
import { X, Palette } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Theme = "dark" | "light";

export default function AppearanceSettings({
  open,
  onClose,
}: Props) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("skillbridge-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  function changeTheme(value: Theme) {
    setTheme(value);

    localStorage.setItem("skillbridge-theme", value);

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(value);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl sm:p-8">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Palette className="h-5 w-5 text-zinc-300" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Appearance
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-500 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        <p className="mt-6 text-sm text-zinc-400">
          Choose how SkillBridge should look.
        </p>

        {/* Themes */}
        <div className="mt-6 grid grid-cols-2 gap-4">

          <button
            type="button"
            onClick={() => changeTheme("dark")}
            className={`rounded-2xl border p-5 text-left transition ${
              theme === "dark"
                ? "border-white bg-zinc-800"
                : "border-white/10 bg-zinc-900 hover:border-white/20"
            }`}
          >
            <div className="h-20 rounded-xl bg-black" />

            <p className="mt-4 font-bold text-white">
              Dark
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Dark workspace
            </p>
          </button>

          <button
            type="button"
            onClick={() => changeTheme("light")}
            className={`rounded-2xl border p-5 text-left transition ${
              theme === "light"
                ? "border-black bg-zinc-100"
                : "border-white/10 bg-zinc-900 hover:border-white/20"
            }`}
          >
            <div className="h-20 rounded-xl bg-white" />

            <p className="mt-4 font-bold text-white">
              Light
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Light workspace
            </p>
          </button>

        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-white py-3.5 font-bold text-black transition hover:bg-zinc-200"
        >
          Done
        </button>

      </div>
    </div>
  );
}