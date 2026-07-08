"use client";

import { useState } from "react";
import { Tag, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UserCoupon } from "@/types";

export function CouponCard({ coupon }: { coupon: UserCoupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card p-4",
        coupon.isExpired ? "border-border opacity-50" : "border-border"
      )}
    >
      {coupon.isExpired && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -rotate-12 text-center">
          <span className="bg-muted px-4 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Expired
          </span>
        </div>
      )}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Tag className="h-4 w-4" />
        </div>
        <span className="text-lg font-bold text-foreground">{coupon.discount}</span>
      </div>
      <p className="text-sm font-medium text-foreground">{coupon.title}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{coupon.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-md bg-secondary px-2 py-1 font-mono text-xs font-bold text-foreground">
          {coupon.code}
        </span>
        <button
          onClick={handleCopy}
          disabled={coupon.isExpired}
          className={cn(
            "flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            copied
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          {copied ? (
            <><Check className="h-3 w-3" /> Copied!</>
          ) : (
            <><Copy className="h-3 w-3" /> Copy Code</>
          )}
        </button>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Expires {new Date(coupon.validUntil).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
    </div>
  );
}
