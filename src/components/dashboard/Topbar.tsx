"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  User,
  Settings,
  Menu,
} from "lucide-react";

import { useProfile } from "@/features/profile/hooks/useProfile";
import { useAuth } from "@/features/auth/hooks/useAuth";

import LogoutButton from "@/components/auth/LogoutButton";
import Notifications from "./Notifications";

interface Props {
  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

export default function Topbar({
  setSidebarOpen,
}: Props) {
  const { profile } = useProfile();
  const { user } = useAuth();

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
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  const initial =
    profile?.full_name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">

        {/* Left */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-slate-800 lg:hidden"
          >
            <Menu
              size={24}
              className="text-white"
            />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Dashboard
            </h1>

            <p className="text-sm text-slate-400">
              Welcome back,{" "}
              <span className="font-semibold text-white">
                {profile?.full_name || "Developer"}
              </span>{" "}
              👋
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {user && (
            <div className="relative">
              <Notifications userId={user.id} />
            </div>
          )}

          <div
            ref={menuRef}
            className="relative"
          >
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2"
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="h-11 w-11 rounded-full border-2 border-indigo-500 object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
                  {initial}
                </div>
              )}

              <ChevronDown
                size={18}
                className={`text-white transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">

                <div className="border-b border-white/10 p-4">
                  <p className="font-semibold text-white">
                    {profile?.full_name || "Developer"}
                  </p>

                  <p className="text-sm text-slate-400">
                    {profile?.headline ||
                      "Welcome to SkillBridge"}
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-white transition hover:bg-slate-800"
                >
                  <User size={18} />
                  My Profile
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-3 text-white transition hover:bg-slate-800"
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

      </div>
    </header>
  );
}