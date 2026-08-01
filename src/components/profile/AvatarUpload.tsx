"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { uploadAvatar } from "@/features/profile/services/storage.service";
import { updateProfile } from "@/features/profile/services/profile.service";

interface Props {
  avatarUrl: string | null;
}

export default function AvatarUpload({ avatarUrl }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState(
    avatarUrl || "/default-avatar.png"
  );

  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUploading(false);
      return;
    }

    const { publicUrl, error } =
      await uploadAvatar(user.id, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    setPreview(publicUrl!);

    await updateProfile(user.id, {
      avatar_url: publicUrl!,
    });

    setUploading(false);
  }

  return (
    <div className="flex flex-col items-center">

      <img
        src={preview}
        alt="Avatar"
        className="h-36 w-36 rounded-full border-4 border-indigo-500 object-cover"
      />

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
      >
        {uploading ? "Uploading..." : "Change Avatar"}
      </button>

    </div>
  );
}