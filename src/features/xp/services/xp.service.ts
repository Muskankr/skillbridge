import { supabase } from "@/lib/supabase";

export type XPResult = {
  success: boolean;
  awarded: boolean;
  error: any | null;
};

/**
 * Award XP through the Supabase database function.
 *
 * IMPORTANT:
 * The actual XP amount is determined server-side.
 * The client only sends the action/reason.
 */
export async function awardXP(
  userId: string,
  reason: string
): Promise<XPResult> {
  const { data, error } = await supabase.rpc("award_xp", {
    p_user_id: userId,
    p_reason: reason,
  });

  if (error) {
    console.error("XP award error:", error);

    return {
      success: false,
      awarded: false,
      error,
    };
  }

  return {
    success: true,
    awarded: data === true,
    error: null,
  };
}