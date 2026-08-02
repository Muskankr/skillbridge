import { supabase } from "@/lib/supabase";

export async function getStreak(userId: string) {
    const { data, error } = await supabase
        .from("user_streaks")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function updateStreak(userId: string) {
    try {
        const today = new Date();

        const todayString = today.toISOString().split("T")[0];

        const yesterday = new Date();

        yesterday.setDate(today.getDate() - 1);

        const yesterdayString = yesterday.toISOString().split("T")[0];

        const { data } = await supabase
            .from("user_streaks")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

        if (!data) {
            await supabase.from("user_streaks").insert({
                user_id: userId,
                streak: 1,
                longest_streak: 1,
                last_login: todayString,
            });

            return;
        }

        if (data.last_login === todayString) return;

        let streak = 1;

        if (data.last_login === yesterdayString) {
            streak = data.streak + 1;
        }

        const longest = Math.max(streak, data.longest_streak);

        await supabase
            .from("user_streaks")
            .update({
                streak,
                longest_streak: longest,
                last_login: todayString,
            })
            .eq("user_id", userId);
    } catch (error) {
        console.error(error);
    }
}