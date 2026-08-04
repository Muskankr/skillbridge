"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { dashboardLinks } from "@/constants/dashboard";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useProfile } from "@/features/profile/hooks/useProfile";

import LogoutButton from "@/components/auth/LogoutButton";

export default function Sidebar() {
  const pathname = usePathname();

  const { user } = useAuth();
  const { profile, loading } = useProfile();

  const [open, setOpen] = useState(false);

  const initial =
    profile?.full_name?.charAt(0).toUpperCase() || "U";

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white shadow-lg lg:hidden"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-white/10 bg-slate-950/95 backdrop-blur-xl
          transform transition-transform duration-300
          ${
            open ? "translate-x-0" : "-translate-x-full"
          }
          lg:sticky lg:translate-x-0
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6 lg:hidden">
          <h1 className="text-2xl font-black text-white">
            SkillBridge
          </h1>

          <button onClick={() => setOpen(false)}>
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden border-b border-white/10 px-8 py-8 lg:block">
          <h1 className="text-3xl font-black text-white">
            SkillBridge
          </h1>
        </div>

        {/* User */}
        <div className="border-b border-white/10 px-6 py-6">
          <div className="flex items-center gap-4">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="h-14 w-14 rounded-full border-2 border-indigo-500 object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                {initial}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate font-semibold text-white">
                {loading
                  ? "Loading..."
                  : profile?.full_name || "Developer"}
              </h2>

              <p className="truncate text-sm text-slate-400">
                {profile?.headline ||
                  profile?.college ||
                  user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-5">
          {dashboardLinks.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`mb-2 flex items-center gap-4 rounded-xl px-5 py-4 transition ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-indigo-600/20 hover:text-white"
                }`}
              >
                <Icon size={22} />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-white/10 p-5">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}