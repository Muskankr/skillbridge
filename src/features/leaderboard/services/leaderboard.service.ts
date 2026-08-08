import { supabase } from "@/lib/supabase";

export async function getLeaderboard() {
  // Get leaderboard data
  const { data: users, error } = await supabase
    .from("leaderboard")
    .select("*")
    .order("xp", {
      ascending: false,
    });

  if (error) {
    return {
      data: [],
      error,
    };
  }

  if (!users || users.length === 0) {
    return {
      data: [],
      error: null,
    };
  }

  // Get users who have disabled leaderboard visibility
  const userIds = users.map((user) => user.id);

  const { data: settings, error: settingsError } = await supabase
    .from("user_settings")
    .select("user_id, show_leaderboard")
    .in("user_id", userIds);

  if (settingsError) {
    console.error("Failed to load leaderboard settings:", settingsError);

    return {
      data: users,
      error: null,
    };
  }

  // Create lookup map
  const settingsMap = new Map(
    (settings || []).map((setting) => [
      setting.user_id,
      setting.show_leaderboard,
    ])
  );

  // Only keep users who allow leaderboard visibility
  const visibleUsers = users.filter((user) => {
    const showLeaderboard = settingsMap.get(user.id);

    // If no setting exists, default to visible
    return showLeaderboard !== false;
  });

  return {
    data: visibleUsers,
    error: null,
  };
}