import { settings } from "@/constants/settings";
import SettingsCard from "./SettingsCard";
import AccountOverview from "./AccountOverview";

export default function SettingsPage() {
  return (
    <main className="space-y-10">

      <div>

        <h1 className="text-4xl font-black">
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
            key={setting.title}
            setting={setting}
          />

        ))}

      </section>

    </main>
  );
}