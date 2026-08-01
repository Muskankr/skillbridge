"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { addCertificate } from "@/features/certificates/services/certificate.service";

export default function CertificateForm() {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issue_date: "",
    credential_url: "",
    image_url: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first.");
    return;
  }

  const { error } = await addCertificate({
    user_id: user.id,
    title: formData.title,
    issuer: formData.issuer,
    issue_date: formData.issue_date,
    credential_url: formData.credential_url,
    image_url: formData.image_url,
    description: formData.description,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Certificate Added Successfully!");

  setFormData({
    title: "",
    issuer: "",
    issue_date: "",
    credential_url: "",
    image_url: "",
    description: "",
  });

  window.location.reload();
}

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold text-white">
        Add Certificate
      </h2>

      <div className="mt-6 grid gap-5">

        <input
          name="title"
          placeholder="Certificate Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white"
        />

        <input
          name="issuer"
          placeholder="Issuing Organization"
          value={formData.issuer}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white"
        />

        <input
          type="date"
          name="issue_date"
          value={formData.issue_date}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white"
        />

        <input
          name="credential_url"
          placeholder="Credential URL"
          value={formData.credential_url}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white"
        />

        <input
          name="image_url"
          placeholder="Certificate Image URL"
          value={formData.image_url}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white"
        />

        <textarea
          name="description"
          rows={4}
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="rounded-xl bg-slate-800 p-4 text-white"
        />

        <button
  onClick={handleSubmit}
  className="rounded-xl bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-500"
>
  Save Certificate
</button>

      </div>

    </div>
  );
}