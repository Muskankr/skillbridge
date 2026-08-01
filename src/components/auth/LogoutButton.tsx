"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/services/auth.service";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();

    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500"
    >
      Logout
    </button>
  );
}