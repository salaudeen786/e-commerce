"use client";

import { motion } from "framer-motion";
import { useDashboardStore } from "@/store/dashboard-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { Button, buttonVariants } from "@/components/ui/button";
import { mockOrders } from "@/mocks/mock-data";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/types";

export default function DashboardPage() {
  const notifications = useDashboardStore((s) => s.notifications);
  const rewardPoints = useDashboardStore((s) => s.rewardPoints);
  const userReviews = useDashboardStore((s) => s.userReviews);
  const wishlistItems = useWishlistStore((s) => s.items);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const stats: (DashboardStat & { iconKey: string })[] = [
    { label: "Total Orders", value: mockOrders.length, change: 12, trend: "up", iconKey: "orders" },
    { label: "Wishlist Items", value: wishlistItems.length, change: 8, trend: "up", iconKey: "wishlist" },
    { label: "Reward Points", value: rewardPoints, change: 24, trend: "up", iconKey: "rewards" },
    { label: "Reviews", value: userReviews.length, change: 0, trend: "up", iconKey: "reviews" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <StatCard stat={stat} iconKey={stat.iconKey} />
          </motion.div>
        ))}
      </div>

      <RecentOrdersTable orders={mockOrders} />

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Notifications</p>
          <p className="text-lg font-bold text-foreground">
            {unreadCount} unread {unreadCount === 1 ? "message" : "messages"}
          </p>
        </div>
        <div className="flex gap-3">
          <a href="/dashboard/notifications" className={cn(buttonVariants({ variant: "outline", size: "default" }))}>View All</a>
          <a href="/shop" className={cn(buttonVariants({ size: "default" }))}>Browse Shop</a>
        </div>
      </div>
    </div>
  );
}
