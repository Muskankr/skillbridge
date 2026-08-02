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
            className="relative rounded-xl border border-gray-700 bg-[#111827] px-5 py-3 hover:bg-gray-800"
        >
            🔔 Notifications

            {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadCount}
                </span>
            )}
        </button>
    );
}