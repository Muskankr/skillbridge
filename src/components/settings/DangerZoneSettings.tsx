"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function DangerZoneSettings({
  open,
  onClose,
}: Props) {
  const [deleting, setDeleting] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  if (!open) {
    return null;
  }

  async function handleDeleteAccount() {
    if (confirmation !== "DELETE") {
      alert('Please type "DELETE" to confirm.');
      return;
    }

    const confirmed = window.confirm(
      "Are you absolutely sure? This will permanently delete your account and cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      // Check logged-in user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        alert("User not found.");
        return;
      }

      // Call Supabase PostgreSQL function
      const { error: deleteError } = await supabase.rpc(
        "delete_my_account"
      );

      if (deleteError) {
        console.error("Delete account error:", deleteError);
        alert(deleteError.message);
        return;
      }

      // Sign out after successful deletion
      await supabase.auth.signOut();

      alert("Your account has been permanently deleted.");

      // Redirect to home page
      window.location.href = "/";
    } catch (error) {
      console.error("Account deletion error:", error);
      alert("Something went wrong while deleting your account.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-red-500/20 bg-slate-900 p-6 shadow-2xl">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Danger Zone
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              These actions cannot be undone.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="text-xl text-slate-400 transition hover:text-white disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Warning */}
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <h3 className="font-semibold text-red-400">
            Delete your account
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Permanently delete your SkillBridge account and
            associated account data. This action cannot be
            reversed.
          </p>
        </div>

        {/* Confirmation */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Type{" "}
            <span className="font-bold text-red-400">
              DELETE
            </span>{" "}
            to confirm
          </label>

          <input
            type="text"
            value={confirmation}
            onChange={(e) =>
              setConfirmation(e.target.value)
            }
            placeholder="DELETE"
            disabled={deleting}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-red-500 disabled:opacity-50"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={
              deleting ||
              confirmation !== "DELETE"
            }
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting
              ? "Deleting..."
              : "Delete Account"}
          </button>

        </div>
      </div>
    </div>
  );
}