"use client";

import { useState } from "react";

import { settings } from "@/constants/settings";

import AccountOverview from "./AccountOverview";
import SettingsCard from "./SettingsCard";
import NotificationSettings from "./NotificationSettings";
import PrivacySettings from "./PrivacySettings";
import AppearanceSettings from "./AppearanceSettings";
import SecuritySettings from "./SecuritySettings";
import DangerZoneSettings from "./DangerZoneSettings";

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  function handleOpen(id: string) {
    setActiveModal(id);
  }

  function handleClose() {
    setActiveModal(null);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

      {/* Header */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          SETTINGS
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Manage your workspace
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Manage your account, preferences, privacy and security.
        </p>
      </section>

      {/* Account Overview */}
      <section className="mt-8">
        <AccountOverview />
      </section>

      {/* Settings */}
      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {settings.map((setting) => (
          <SettingsCard
            key={setting.id}
            setting={setting}
            onOpen={() => handleOpen(setting.id)}
          />
        ))}
      </section>

      {/* Modals */}

      <NotificationSettings
        open={activeModal === "notifications"}
        onClose={handleClose}
      />

      <PrivacySettings
        open={activeModal === "privacy"}
        onClose={handleClose}
      />

      <AppearanceSettings
        open={activeModal === "appearance"}
        onClose={handleClose}
      />

      <SecuritySettings
        open={activeModal === "security"}
        onClose={handleClose}
      />

      <DangerZoneSettings
        open={activeModal === "danger"}
        onClose={handleClose}
      />
    </main>
  );
}