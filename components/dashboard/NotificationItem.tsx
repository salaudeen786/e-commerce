"use client";

import { motion } from "framer-motion";
import { Package, Tag, Bell, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardNotification } from "@/types";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  order: <Package className="h-4 w-4" />,
  promo: <Tag className="h-4 w-4" />,
  system: <Bell className="h-4 w-4" />,
  reward: <Star className="h-4 w-4" />,
};

const TYPE_COLORS: Record<string, string> = {
  order: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
  promo: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
  system: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800",
  reward: "text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30",
};

export function NotificationItem({
  notification,
  onMarkRead,
  onDismiss,
}: {
  notification: DashboardNotification;
  onMarkRead: () => void;
  onDismiss: () => void;
}) {
  const timeAgo = (() => {
    const diff = Date.now() - new Date(notification.createdAt).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  })();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 50 }}
      onClick={() => !notification.read && onMarkRead()}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors",
        !notification.read && "bg-primary/5"
      )}
    >
      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", TYPE_COLORS[notification.type])}>
        {TYPE_ICONS[notification.type]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={cn("text-sm", notification.read ? "text-foreground" : "font-semibold text-foreground")}>
            {notification.title}
          </p>
          {!notification.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">{notification.message}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">{timeAgo}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDismiss(); }}
        className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
