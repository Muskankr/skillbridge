"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

import { ChevronDown, User, Settings, LogOut } from "lucide-react";

import { useProfile } from "@/features/profile/hooks/useProfile";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Topbar() {
  const { profile } = useProfile();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial =
    profile?.full_name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="flex items-center justify-between border-b border-white/10 bg-slate-950 px-8 py-4">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400">
          Welcome back,{" "}
          <span className="font-semibold text-white">
            {profile?.full_name || "Developer"}
          </span>{" "}
          👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <button className="relative rounded-xl border border-white/10 px-5 py-3 text-white hover:bg-slate-800 transition">
  Notifications

  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
    0
  </span>
</button>

        <div className="relative" ref={menuRef}>

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            {profile?.avatar_url ? (
  <img
    src={profile.avatar_url}
    alt="Avatar"
    className="h-11 w-11 rounded-full object-cover border-2 border-indigo-500"
  />
) : (
  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
    {initial}
  </div>
)}

            <ChevronDown
              size={18}
              className={`text-white transition ${open ? "rotate-180" : ""
                }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-slate-900 shadow-xl">

              <div className="border-b border-white/10 p-4">

                <p className="font-semibold text-white">
                  {profile?.full_name || "Developer"}
                </p>

                <p className="text-sm text-slate-400">
                  {profile?.headline || "Welcome to SkillBridge"}
                </p>

              </div>

              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-800"
              >
                <User size={18} />
                My Profile
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-slate-800"
              >
                <Settings size={18} />
                Settings
              </Link>

              <div className="border-t border-white/10 p-2">
                <LogoutButton />
              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}