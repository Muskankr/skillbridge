"use client";

import NotificationItem from "./NotificationItem";

interface Props {
    notifications: any[];
    onRead: (id: string) => void;
    onMarkAll: () => void;
}

export default function NotificationDropdown({
    notifications,
    onRead,
    onMarkAll,
}: Props) {
    return (
        <div className="absolute right-0 mt-3 w-96 rounded-xl border border-gray-700 bg-[#111827] shadow-2xl z-50">
            <div className="flex items-center justify-between border-b border-gray-700 p-4">
                <h2 className="text-lg font-bold text-white">
                    Notifications
                </h2>

                <button
                    onClick={onMarkAll}
                    className="text-sm text-purple-400 hover:text-purple-300"
                >
                    Mark all read
                </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="p-6 text-center text-gray-400">
                        No notifications
                    </p>
                ) : (
                    notifications.map((notification) => (
                        <NotificationItem
                            key={notification.id}
                            notification={notification}
                            onRead={onRead}
                        />
                    ))
                )}
            </div>
        </div>
    );
}