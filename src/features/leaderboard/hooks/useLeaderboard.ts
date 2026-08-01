"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboard.service";

export function useLeaderboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);

    const { data, error } = await getLeaderboard();

    if (error) {
      console.error(error);
      setUsers([]);
    } else {
      setUsers(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return {
    users,
    loading,
    refresh: load,
  };
}