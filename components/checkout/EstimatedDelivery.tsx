"use client";

import { Truck } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function EstimatedDelivery() {
  const shipping = useCartStore((s) => s.shipping);
  const today = new Date();

  const daysMatch = shipping.estimatedDays.match(/(\d+)–(\d+)/);
  let start = today.getDate() + 5;
  let end = today.getDate() + 8;
  if (daysMatch) {
    start = today.getDate() + parseInt(daysMatch[1], 10);
    end = today.getDate() + parseInt(daysMatch[2], 10);
  }

  const startDate = new Date(today.getFullYear(), today.getMonth(), start);
  const endDate = new Date(today.getFullYear(), today.getMonth(), end);
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
      <Truck className="h-5 w-5 text-primary" />
      <div>
        <p className="text-sm font-medium text-foreground">{shipping.label}</p>
        <p className="text-xs text-muted-foreground">
          Expected by {startDate.toLocaleDateString("en-US", options)} –{" "}
          {endDate.toLocaleDateString("en-US", options)}
        </p>
      </div>
    </div>
  );
}
