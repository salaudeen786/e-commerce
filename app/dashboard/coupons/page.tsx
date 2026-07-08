"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useDashboardStore } from "@/store/dashboard-store";
import { CouponCard } from "@/components/dashboard/CouponCard";
import { cn } from "@/lib/utils";

export default function CouponsPage() {
  const coupons = useDashboardStore((s) => s.userCoupons);
  const [tab, setTab] = useState<"active" | "expired">("active");

  const filtered = coupons.filter((c) => (tab === "active" ? !c.isExpired : c.isExpired));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Coupons</h1>

      <div className="flex gap-1">
        {(["active", "expired"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors",
              tab === t
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {t} ({coupons.filter((c) => (t === "active" ? !c.isExpired : c.isExpired)).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
          <Tag className="mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-base font-medium text-foreground">No {tab} coupons</p>
          <p className="text-sm text-muted-foreground">Check back later for new offers!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((c, i) => (
            <motion.div key={c.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <CouponCard coupon={c} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
