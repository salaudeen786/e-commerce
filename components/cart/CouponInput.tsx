"use client";

import { useState } from "react";
import { Tag, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

export function CouponInput() {
  const [code, setCode] = useState("");
  const coupon = useCartStore((s) => s.coupon);
  const couponError = useCartStore((s) => s.couponError);
  const applyCoupon = useCartStore((s) => s.applyCoupon);
  const removeCoupon = useCartStore((s) => s.removeCoupon);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-3 text-base font-semibold text-foreground">Promo Code</h3>
      {coupon ? (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/20">
          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="flex-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {coupon.code} — {coupon.discountPercent}% off
          </span>
          <button
            onClick={removeCoupon}
            className="flex h-6 w-6 items-center justify-center rounded-full text-emerald-600 transition-colors hover:bg-emerald-200 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
            aria-label="Remove coupon"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyCoupon(code);
              }}
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <Button
            variant="outline"
            size="default"
            className="shrink-0"
            onClick={() => applyCoupon(code)}
          >
            Apply
          </Button>
        </div>
      )}
      <AnimatePresence>
        {couponError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-xs text-destructive"
          >
            {couponError}. Try SWEET15, BDAY20, or COMBO25.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
