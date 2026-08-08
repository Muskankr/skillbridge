"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { dashboardLinks } from "@/constants/dashboard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/profile/hooks/useProfile";

import LogoutButton from "@/components/auth/LogoutButton";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({
  open,
  setOpen,
}: Props) {
  const pathname = usePathname();

  const { user } = useAuth();
  const { profile, loading } = useProfile();

  const initial =
    profile?.full_name?.charAt(0).toUpperCase() || "U";

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-72 flex-col
          border-r border-[#262626]
          bg-black
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-[#262626] px-7">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="text-2xl font-bold tracking-tight text-white"
          >
            SkillBridge
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-[#111] hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* User */}
        <div className="border-b border-[#262626] px-6 py-6">
          <div className="flex items-center gap-3">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="h-10 w-10 rounded-full border border-[#444] object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#111] text-sm font-semibold text-white">
                {initial}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {loading
                  ? "Loading..."
                  : profile?.full_name || "Developer"}
              </p>

              <p className="truncate text-xs text-zinc-500">
                {profile?.headline ||
                  profile?.college ||
                  user?.email ||
                  "Developer"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
            Workspace
          </p>

          <div className="space-y-1">
            {dashboardLinks.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    group flex items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm font-medium
                    transition
                    ${
                      active
                        ? "border border-[#333] bg-[#111] text-white"
                        : "border border-transparent text-zinc-500 hover:bg-[#0d0d0d] hover:text-zinc-200"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={
                      active
                        ? "text-white"
                        : "text-zinc-600 transition group-hover:text-zinc-300"
                    }
                  />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-[#262626] p-4">
          <div className="rounded-lg">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}