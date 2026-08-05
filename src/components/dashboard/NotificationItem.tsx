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
      className={`cursor-pointer border-b border-white/5 p-4 transition hover:bg-slate-800 ${
        !notification.is_read ? "bg-slate-900/80" : ""
      }`}
    >
      <div className="flex items-start gap-3">

        {!notification.is_read && (
          <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-violet-500" />
        )}

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white">
            {notification.title}
          </h3>

          <p className="mt-1 break-words whitespace-normal text-sm text-slate-400">
            {notification.message}
          </p>
        </div>

      </div>
    </div>
  );
}