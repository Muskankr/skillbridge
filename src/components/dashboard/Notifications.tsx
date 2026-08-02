"use client";

import { useEffect, useState } from "react";
import {
    getNotifications,
    getUnreadCount,
    markAllRead,
    markAsRead,
} from "@/features/notifications/notificationService";

import NotificationBell from "./NotificationBell";
import NotificationDropdown from "./NotificationDropdown";

interface Props {
    userId: string;
}

export default function Notifications({ userId }: Props) {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);

    async function load() {
        const data = await getNotifications(userId);
        const unread = await getUnreadCount(userId);

        setNotifications(data);
        setCount(unread);
    }

    useEffect(() => {
        load();
    }, []);

    async function handleRead(id: string) {
        await markAsRead(id);
        load();
    }

    async function handleMarkAll() {
        await markAllRead(userId);
        load();
    }

    return (
        <div className="relative">
            <NotificationBell
                unreadCount={count}
                onClick={() => setOpen(!open)}
            />

            {open && (
                <NotificationDropdown
                    notifications={notifications}
                    onRead={handleRead}
                    onMarkAll={handleMarkAll}
                />
            )}
        </div>
    );
}