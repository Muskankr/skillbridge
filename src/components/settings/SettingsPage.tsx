"use client";

import { useState } from "react";

import { settings } from "@/constants/settings";

import AccountOverview from "./AccountOverview";
import SettingsCard from "./SettingsCard";

import NotificationSettings from "./NotificationSettings";
import PrivacySettings from "./PrivacySettings";

import AppearanceSettings from "./AppearanceSettings";

import SecuritySettings from "./SecuritySettings";

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  function handleOpen(id: string) {
    setActiveModal(id);
  }

  function handleClose() {
    setActiveModal(null);
  }

  return (
    <>
      <main className="space-y-10">
        <div>
          <h1 className="text-4xl font-black text-white">
            Settings
          </h1>

          <p className="mt-3 text-slate-400">
            Manage your account, preferences and privacy.
          </p>
        </div>

        <AccountOverview />

        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {settings.map((setting) => (
            <SettingsCard
              key={setting.id}
              setting={setting}
              onOpen={() => handleOpen(setting.id)}
            />
          ))}
        </section>
      </main>

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

    </>
  );
}