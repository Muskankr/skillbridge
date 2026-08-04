import { supabase } from "@/lib/supabase";

export async function submitFeedback(
  userId: string,
  rating: number,
  category: string,
  message: string,
  email: string
) {
  const { error } = await supabase
    .from("feedback")
    .insert({
      user_id: userId,
      rating,
      category,
      message,
      email,
    });

  if (error) {
    console.error(error);
    return false;
  }

  return true;
}