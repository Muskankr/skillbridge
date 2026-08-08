"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signUp } from "@/features/auth/services/auth.service";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSignup() {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      alert(
        "Password should be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    const { error } = await signUp(
      email,
      password
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "🎉 Account created successfully!"
    );

    router.push("/login");
  }

  return (
    <div className="space-y-5">

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Email
        </label>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
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
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
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

      {/* Signup */}
      <button
        onClick={handleSignup}
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
        {loading
          ? "Creating Account..."
          : "Create Account"}
      </button>

      {/* Login */}
      <p className="pt-2 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-white underline underline-offset-4 transition hover:text-zinc-300"
        >
          Login
        </Link>
      </p>
    </div>
  );
}