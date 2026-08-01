"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/features/auth/services/auth.service";

export default function SignupForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await signUp(email, password);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("🎉 Account created successfully!");

    router.push("/login");
  }

  return (
    <div className="space-y-6">

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-800 p-4 text-white outline-none"
      />

      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-500"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-indigo-400 hover:text-indigo-300"
        >
          Login
        </a>
      </p>

    </div>
  );
}