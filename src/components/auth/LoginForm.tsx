"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  signIn,
  demoLogin,
} from "@/features/auth/services/auth.service";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    const { error } = await signIn(
      email,
      password
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  async function handleDemoLogin() {
    setLoading(true);

    const { error } = await demoLogin();

    setLoading(false);

    if (error) {
      alert(
        "Demo account is not created yet in Supabase."
      );
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="space-y-6">

      <button
        onClick={handleDemoLogin}
        disabled={loading}
        className="w-full rounded-xl bg-emerald-600 py-4 font-semibold text-white transition hover:bg-emerald-500"
      >
        🚀 Continue with Demo Account
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm text-slate-400">
          OR
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-500"
      >
        {loading ? "Signing In..." : "Login"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Create Account
        </a>
      </p>

    </div>
  );
}