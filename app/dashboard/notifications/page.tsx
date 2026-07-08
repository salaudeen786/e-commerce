"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { NotificationItem } from "@/components/dashboard/NotificationItem";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTERS = ["all", "order", "promo", "reward", "system"] as const;

export default function NotificationsPage() {
  const notifications = useDashboardStore((s) => s.notifications);
  const markRead = useDashboardStore((s) => s.markNotificationRead);
  const markAllRead = useDashboardStore((s) => s.markAllNotificationsRead);
  const dismissNotification = useDashboardStore((s) => s.dismissNotification);
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]>("all");

  const filtered = activeFilter === "all" ? notifications : notifications.filter((n) => n.type === activeFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
        {notifications.some((n) => !n.read) && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-1 h-3.5 w-3.5" /> Mark All Read
          </Button>
        )}
      </div>

      <div className="flex gap-1 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors",
              activeFilter === f
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
          <Bell className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-base font-medium text-foreground">No notifications</p>
          <p className="text-sm text-muted-foreground">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((n, i) => (
              <motion.div
                key={n.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ delay: i * 0.03 }}
              >
                <NotificationItem
                  notification={n}
                  onMarkRead={() => markRead(n.id)}
                  onDismiss={() => dismissNotification(n.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
