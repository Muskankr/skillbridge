"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { submitFeedback } from "@/features/feedback/feedbackService";

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState("General");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!message.trim()) {
      alert("Please write your feedback.");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const success = await submitFeedback(
      user?.id ?? "",
      rating,
      category,
      message,
      email
    );

    setLoading(false);

    if (success) {
      alert("🎉 Thank you for your feedback!");

      setRating(5);
      setCategory("General");
      setMessage("");
      setEmail("");
    } else {
      alert("Something went wrong.");
    }
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-3xl rounded-3xl bg-slate-900 p-8 shadow-lg">

        <h1 className="text-4xl font-bold text-white">
          Feedback
        </h1>

        <p className="mt-2 text-slate-400">
          We'd love to hear your thoughts about SkillBridge.
        </p>

        <div className="mt-8">

          <label className="mb-2 block text-white">
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
            <option value={4}>⭐⭐⭐⭐ Good</option>
            <option value={3}>⭐⭐⭐ Average</option>
            <option value={2}>⭐⭐ Poor</option>
            <option value={1}>⭐ Very Poor</option>
          </select>

        </div>

        <div className="mt-6">

          <label className="mb-2 block text-white">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option>General</option>
            <option>Bug Report</option>
            <option>Feature Request</option>
            <option>UI/UX</option>
          </select>

        </div>

        <div className="mt-6">

          <label className="mb-2 block text-white">
            Feedback
          </label>

          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-4 text-white"
            placeholder="Write your feedback..."
          />

        </div>

        <div className="mt-6">

          <label className="mb-2 block text-white">
            Email (Optional)
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
            placeholder="example@email.com"
          />

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

      </div>
    </DashboardLayout>
  );
}