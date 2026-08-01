"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import CertificateCard from "./CertificateCard";
import CertificateForm from "./CertificateForm";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  image_url: string;
  description: string;
}

export default function CertificateGrid() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showForm, setShowForm] = useState(false);

  async function loadCertificates() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setCertificates(data || []);
  }

  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <main className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Certificates
          </h1>

          <p className="text-slate-400">
            Showcase your certifications.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
        >
          {showForm ? "Close" : "+ Add Certificate"}
        </button>

      </div>

      {showForm && <CertificateForm />}

      {certificates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">

          <div className="text-6xl">📜</div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            No Certificates Yet
          </h2>

          <p className="mt-2 text-slate-400">
            Add your first certificate.
          </p>

        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
            />
          ))}

        </div>
      )}

    </main>
  );
}