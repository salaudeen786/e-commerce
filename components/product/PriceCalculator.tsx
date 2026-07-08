"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getWeightUpcharge, MESSAGE_FEE } from "@/mocks/product-utils";

interface PriceCalculatorProps {
  basePrice: number;
  weight: string | null;
  hasMessage: boolean;
  quantity: number;
  className?: string;
}

export function PriceCalculator({
  basePrice,
  weight,
  hasMessage,
  quantity,
  className,
}: PriceCalculatorProps) {
  const weightCharge = getWeightUpcharge(weight ?? undefined);
  const messageCharge = hasMessage ? MESSAGE_FEE : 0;
  const subtotal = basePrice + weightCharge + messageCharge;
  const total = subtotal * quantity;

  const items: { label: string; amount: number }[] = [
    { label: "Base Price", amount: basePrice },
    ...(weightCharge > 0
      ? [{ label: `Upcharge (${weight})`, amount: weightCharge }]
      : []),
    ...(messageCharge > 0
      ? [{ label: "Message Fee", amount: messageCharge }]
      : []),
  ];

  if (items.length === 1 && quantity === 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className={cn("rounded-xl border border-border bg-muted/50 p-4", className)}
    >
      <h4 className="mb-3 text-sm font-semibold text-foreground">Price Breakdown</h4>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="text-foreground">${item.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
      {quantity > 1 && (
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>Quantity</span>
          <span>× {quantity}</span>
        </div>
      )}
      <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold">
        <span className="text-foreground">Total</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>
    </motion.div>
  );
}
