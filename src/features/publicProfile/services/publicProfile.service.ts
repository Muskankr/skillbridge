import { supabase } from "@/lib/supabase";

export async function getPublicProfile(username: string) {
  // First get the profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    return {
      data: null,
      error: profileError || new Error("Profile not found"),
    };
  }

  // Then get privacy settings
  const { data: settings, error: settingsError } = await supabase
    .from("user_settings")
    .select("profile_public, show_streak")
    .eq("user_id", profile.id)
    .single();

  if (settingsError) {
    console.error("Privacy settings error:", settingsError);

    return {
      data: null,
      error: settingsError,
    };
  }

  // Profile is private
  if (!settings?.profile_public) {
    return {
      data: {
        private: true,
        profile: null,
      },
      error: null,
    };
  }

  return {
    data: {
      private: false,
      profile: {
        ...profile,
        show_streak: settings.show_streak,
      },
    },
    error: null,
  };
}