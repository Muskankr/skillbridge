"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Session, User } from "@supabase/supabase-js";
import {
  getProfile,
  createProfile,
} from "@/features/profile/services/profile.service";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initialize() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const { data } = await getProfile(session.user.id);

        if (!data) {
          await createProfile({
            id: session.user.id,
            email: session.user.email,
          });
        }
      }

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data } = await getProfile(session.user.id);

        if (!data) {
          await createProfile({
            id: session.user.id,
            email: session.user.email,
          });
        }
      }

      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    session,
    loading,
  };
}