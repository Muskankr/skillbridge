"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getCertificates } from "../services/certificate.service";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  credential_url: string;
  image_url: string;
  description: string;
}

export function useCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await getCertificates(user.id);

      setCertificates(data || []);
      setLoading(false);
    }

    load();
  }, []);

  return {
    certificates,
    loading,
  };
}