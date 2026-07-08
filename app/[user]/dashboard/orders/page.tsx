"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderStatusBadge } from "@/components/dashboard/OrderStatusBadge";
import { mockOrders } from "@/mocks/mock-data";
import { ORDER_STATUS_OPTIONS } from "@/constants";
import type { OrderStatus } from "@/types";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = mockOrders.filter((o) => {
    if (activeTab !== "all" && o.status !== activeTab) return false;
    if (search && !o.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Orders</h1>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 overflow-x-auto">
          {ORDER_STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setActiveTab(opt.value)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                activeTab === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm sm:w-56"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
          <Package className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-base font-medium text-foreground">No orders found</p>
          <p className="text-sm text-muted-foreground">Try a different filter or search term.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((order, i) => (
              <motion.a
                key={order.id}
                href={`/dashboard/orders/${encodeURIComponent(order.id)}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">#{order.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    {" · "}{order.items.length} {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-foreground">${order.total.toFixed(2)}</span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
