"use client";

interface NotificationItemProps {
    notification: any;
    onRead: (id: string) => void;
}

export default function NotificationItem({
    notification,
    onRead,
}: NotificationItemProps) {
    return (
        <div
            onClick={() => onRead(notification.id)}
            className={`cursor-pointer rounded-lg p-3 transition hover:bg-gray-800 ${
                !notification.is_read ? "bg-gray-900" : ""
            }`}
        >
            <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-semibold text-white">
                        {notification.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                        {notification.message}
                    </p>
                </div>

                {!notification.is_read && (
                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
                )}
            </div>
        </div>
    );
}