import { supabase } from "@/lib/supabase";

export async function getNotifications(userId: string) {
    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }

    return data;
}

export async function createNotification(
    userId: string,
    title: string,
    message: string,
    type: string
) {
    const { error } = await supabase.from("notifications").insert({
        user_id: userId,
        title,
        message,
        type,
    });

    if (error) {
        console.error("Error creating notification:", error);
    }
}

export async function markAsRead(id: string) {
    const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);

    if (error) console.error(error);
}

export async function markAllRead(userId: string) {
    const { error } = await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("is_read", false);

    if (error) console.error(error);
}

export async function deleteNotification(id: string) {
    const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", id);

    if (error) console.error(error);
}

export async function getUnreadCount(userId: string) {
    const { count, error } = await supabase
        .from("notifications")
        .select("*", {
            count: "exact",
            head: true,
        })
        .eq("user_id", userId)
        .eq("is_read", false);

    if (error) {
        console.error(error);
        return 0;
    }

    return count ?? 0;
}