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

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick
      );
    };
  }, []);

  const initial =
    profile?.full_name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 border-b border-[#262626] bg-black/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg border border-[#262626] p-2 text-zinc-400 transition hover:bg-[#111] hover:text-white lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Dashboard
            </h1>

            <p className="mt-0.5 text-xs text-zinc-500 sm:text-sm">
              Welcome back,{" "}
              <span className="text-zinc-300">
                {profile?.full_name || "Developer"}
              </span>
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          {user && (
            <div className="rounded-lg border border-[#262626] bg-[#0a0a0a]">
              <Notifications userId={user.id} />
            </div>
          )}

          {/* Profile */}
          <div
            ref={menuRef}
            className="relative"
          >
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-lg border border-transparent p-1.5 transition hover:border-[#262626] hover:bg-[#0d0d0d]"
            >
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt="Avatar"
                  className="h-9 w-9 rounded-full border border-[#444] object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#333] bg-[#111] text-sm font-semibold text-white">
                  {initial}
                </div>
              )}

              <ChevronDown
                size={16}
                className={`hidden text-zinc-500 transition-transform sm:block ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#0a0a0a] shadow-2xl">

                {/* User info */}
                <div className="border-b border-[#262626] p-4">
                  <p className="truncate text-sm font-medium text-white">
                    {profile?.full_name || "Developer"}
                  </p>

                  <p className="mt-1 truncate text-xs text-zinc-500">
                    {profile?.headline ||
                      profile?.college ||
                      user?.email ||
                      "Welcome to SkillBridge"}
                  </p>
                </div>

                {/* Profile */}
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 transition hover:bg-[#111] hover:text-white"
                >
                  <User size={17} />
                  My Profile
                </Link>

                {/* Settings */}
                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 transition hover:bg-[#111] hover:text-white"
                >
                  <Settings size={17} />
                  Settings
                </Link>

                {/* Logout */}
                <div className="border-t border-[#262626] p-2">
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