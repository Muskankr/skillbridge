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
        <div
            className="
absolute
right-0
top-full
mt-2
z-[9999]

w-[320px]
max-w-[calc(100vw-24px)]

sm:w-96

rounded-2xl
border
border-white/10
bg-slate-900
shadow-2xl
"
        >
            <div className="flex items-center justify-between border-b border-white/10 p-4">

                <h2 className="font-bold text-white">
                    Notifications
                </h2>

                <button
                    onClick={onMarkAll}
                    className="text-sm text-violet-400 hover:text-violet-300"
                >
                    Mark all read
                </button>

            </div>

            <div className="max-h-96 overflow-y-auto">

                {notifications.length === 0 ? (
                    <p className="p-6 text-center text-slate-400">
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