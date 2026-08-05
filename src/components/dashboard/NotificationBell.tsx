"use client";

interface Props {
  unreadCount: number;
  onClick: () => void;
}

export default function NotificationBell({
  unreadCount,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 transition hover:bg-slate-800"
    >
      <span>🔔</span>

      <span className="hidden sm:inline">
        Notifications
      </span>

      {unreadCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}