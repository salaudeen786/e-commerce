"use client";

import { useState } from "react";
import { Truck, Search } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import type { ShippingOption } from "@/types";

const SHIPPING_OPTIONS: ShippingOption[] = [
  { method: "free", label: "Free Shipping", cost: 0, estimatedDays: "5–8 business days" },
  { method: "standard", label: "Standard Shipping", cost: 5.99, estimatedDays: "3–5 business days" },
  { method: "express", label: "Express Shipping", cost: 12.99, estimatedDays: "1–2 business days" },
  { method: "overnight", label: "Overnight Shipping", cost: 24.99, estimatedDays: "Next business day" },
];

export function ShippingCalculator() {
  const [zip, setZip] = useState("");
  const [calculated, setCalculated] = useState(false);
  const shipping = useCartStore((s) => s.shipping);
  const setShipping = useCartStore((s) => s.setShipping);
  const subtotal = useCartStore((s) => s.subtotal());

  const handleCalculate = () => {
    if (zip.length >= 3) setCalculated(true);
  };

  const isFree = subtotal >= 50;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
        <Truck className="h-4 w-4 text-primary" />
        Shipping Calculator
      </h3>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="ZIP Code"
          value={zip}
          onChange={(e) => {
            setZip(e.target.value.replace(/\D/g, "").slice(0, 5));
            if (calculated) setCalculated(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCalculate();
          }}
          maxLength={5}
          className="h-10 w-32 rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          onClick={handleCalculate}
          className="flex h-10 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          <Search className="h-3.5 w-3.5" />
          Calculate
        </button>
      </div>
      {calculated && (
        <div className="mt-3 space-y-2">
          {isFree && subtotal >= 50 && shipping.method !== "free" && (
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
              ✦ Free shipping available on orders over $50!
            </p>
          )}
          {SHIPPING_OPTIONS.map((opt) => {
            const finalCost = isFree && opt.method === "free" ? 0 : opt.cost;
            return (
              <label
                key={opt.method}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border border-border px-3 py-2.5 transition-colors",
                  shipping.method === opt.method && "border-primary bg-primary/5"
                )}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={opt.method}
                  checked={shipping.method === opt.method}
                  onChange={() => setShipping(opt.method)}
                  className="h-4 w-4 accent-primary"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">
                    {opt.label}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {opt.estimatedDays}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {finalCost === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
                  ) : (
                    `$${finalCost.toFixed(2)}`
                  )}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
