"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signIn } from "@/features/auth/services/auth.service";

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

    const { error } = await signIn(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="space-y-6">

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Email
        </label>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full rounded-lg
            border border-[#262626]
            bg-[#0a0a0a]
            px-4 py-3
            text-sm text-white
            placeholder:text-zinc-700
            outline-none
            transition
            focus:border-[#555]
            focus:ring-1
            focus:ring-[#333]
          "
        />
      </div>

      {/* Password */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="
            w-full rounded-lg
            border border-[#262626]
            bg-[#0a0a0a]
            px-4 py-3
            text-sm text-white
            placeholder:text-zinc-700
            outline-none
            transition
            focus:border-[#555]
            focus:ring-1
            focus:ring-[#333]
          "
        />
      </div>

      {/* Login */}
      <button
        type="button"
        onClick={handleLogin}
        disabled={loading}
        className="
          w-full rounded-lg
          border border-white
          bg-white
          px-4 py-3
          text-sm font-medium text-black
          transition
          hover:bg-zinc-200
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>

      {/* Signup */}
      <p className="pt-2 text-center text-sm text-zinc-500">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="
            font-medium text-white
            underline underline-offset-4
            transition hover:text-zinc-300
          "
        >
          Create Account
        </Link>
      </p>

    </div>
  );
}