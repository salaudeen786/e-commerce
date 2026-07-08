"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderStatusBadge } from "./OrderStatusBadge";
import type { DashboardOrder } from "@/types";

export function RecentOrdersTable({ orders }: { orders: DashboardOrder[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-base font-bold text-foreground">Recent Orders</h3>
        <Link
          href="/dashboard/orders"
          className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-medium uppercase text-muted-foreground">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Items</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order, i) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border transition-colors hover:bg-muted/50"
              >
                <td className="px-5 py-3 font-medium text-foreground">
                  <Link href={`/dashboard/orders/${encodeURIComponent(order.id)}`} className="hover:text-primary">
                    #{order.id.slice(-8)}
                  </Link>
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-3 text-muted-foreground">{order.items.length}</td>
                <td className="px-5 py-3 font-semibold text-foreground">${order.total.toFixed(2)}</td>
                <td className="px-5 py-3"><OrderStatusBadge status={order.status} /></td>
                <td className="px-5 py-3">
                  <Link
                    href={`/dashboard/orders/${encodeURIComponent(order.id)}`}
                    className="text-primary hover:underline"
                  >
                    View
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
