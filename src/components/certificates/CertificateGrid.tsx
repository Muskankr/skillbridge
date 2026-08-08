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
  const [certificates, setCertificates] =
    useState<Certificate[]>([]);

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  async function loadCertificates() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCertificates([]);
        return;
      }

      const { data, error } =
        await supabase
          .from("certificates")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        console.error(
          "Certificate loading error:",
          error
        );
        return;
      }

      setCertificates(
        (data || []) as Certificate[]
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCertificates();
  }, []);

  function handleCreated() {
    setShowForm(false);
    loadCertificates();
  }

  function handleDeleted(
    certificateId: string
  ) {
    setCertificates((prev) =>
      prev.filter(
        (certificate) =>
          certificate.id !== certificateId
      )
    );
  }

  return (
    <main className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Certificates
          </h1>

          <p className="mt-1 text-slate-400">
            Showcase your verified certifications.
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm((prev) => !prev)
          }
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
        >
          {showForm
            ? "Close"
            : "+ Add Certificate"}
        </button>
      </div>

      {/* Form */}

      {showForm && (
        <CertificateForm
          onCreated={handleCreated}
        />
      )}

      {/* Loading */}

      {loading ? (
        <div className="rounded-2xl border border-white/10 p-12 text-center">
          <p className="text-slate-400">
            Loading certificates...
          </p>
        </div>
      ) : certificates.length === 0 ? (

        /* Empty state */

        <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">

          <div className="text-6xl">
            📜
          </div>

          <h2 className="mt-4 text-2xl font-bold text-white">
            No Certificates Yet
          </h2>

          <p className="mt-2 text-slate-400">
            Add your first verified certificate.
          </p>
        </div>

      ) : (

        /* Certificates */

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {certificates.map(
            (certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onDeleted={
                  handleDeleted
                }
              />
            )
          )}

        </div>
      )}
    </main>
  );
}