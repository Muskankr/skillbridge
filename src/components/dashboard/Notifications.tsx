"use client";

import { useEffect, useRef, useState } from "react";

import NotificationBell from "./NotificationBell";
import NotificationDropdown from "./NotificationDropdown";

import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllRead,
} from "@/features/notifications/notificationService";

interface Props {
  userId: string;
}

export default function Notifications({ userId }: Props) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  async function load() {
    const data = await getNotifications(userId);
    const unread = await getUnreadCount(userId);

    setNotifications(data);
    setCount(unread);
  }

  useEffect(() => {
    if (userId) {
      load();
    }
  }, [userId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  async function handleRead(id: string) {
    await markAsRead(id);
    await load();
  }

  async function handleMarkAll() {
    await markAllRead(userId);
    await load();
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
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