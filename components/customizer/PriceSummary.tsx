"use client";

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import {
  CUSTOMIZER_BASE_PRICE,
  CUSTOMIZER_PRICES,
} from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

function getPrice(map: Record<string, number>, key: string): number {
  return map[key] ?? 0;
}

export function PriceSummary() {
  const { watch } = useFormContext<CakeCustomizerData>();
  const data = watch();

  const breakdown = useMemo(() => {
    const items: { label: string; price: number }[] = [
      { label: "Base Price", price: CUSTOMIZER_BASE_PRICE },
    ];

    const weightPrice = getPrice(CUSTOMIZER_PRICES.weight, data.weight);
    if (weightPrice > 0) items.push({ label: `Weight (${data.weight})`, price: weightPrice });

    const shapePrice = getPrice(CUSTOMIZER_PRICES.shape, data.shape);
    if (shapePrice > 0) items.push({ label: `Shape (${data.shape})`, price: shapePrice });

    const spongePrice = getPrice(CUSTOMIZER_PRICES.sponge, data.sponge);
    if (spongePrice > 0) items.push({ label: `Sponge (${data.sponge})`, price: spongePrice });

    const creamPrice = getPrice(CUSTOMIZER_PRICES.cream, data.cream);
    if (creamPrice > 0) items.push({ label: `Cream (${data.cream})`, price: creamPrice });

    const fillingPrice = getPrice(CUSTOMIZER_PRICES.filling, data.filling);
    if (fillingPrice > 0) items.push({ label: `Filling (${data.filling})`, price: fillingPrice });

    const decorationPrice = getPrice(CUSTOMIZER_PRICES.decoration, data.decoration);
    if (decorationPrice > 0) items.push({ label: `Decoration (${data.decoration})`, price: decorationPrice });

    const colorPrice = getPrice(CUSTOMIZER_PRICES.colorTheme, data.colorTheme);
    if (colorPrice > 0) items.push({ label: `Color Theme`, price: colorPrice });

    const topperPrice = getPrice(CUSTOMIZER_PRICES.cakeTopper, data.cakeTopper);
    if (topperPrice > 0) items.push({ label: `Cake Topper`, price: topperPrice });

    if (data.cakeMessage && data.cakeMessage.length > 0) {
      items.push({ label: "Cake Message", price: CUSTOMIZER_PRICES.extras.cakeMessage });
    }

    if (data.deliveryTime === "express") {
      items.push({ label: "Express Delivery", price: CUSTOMIZER_PRICES.extras.expressDelivery });
    }

    const total = items.reduce((acc, item) => acc + item.price, 0);
    return { items, total };
  }, [data]);

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h4 className="mb-3 text-sm font-bold text-foreground">Price Summary</h4>
      <div className="space-y-1.5">
        {breakdown.items.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-between text-sm"
          >
            <span className="text-muted-foreground">{item.label}</span>
            <span className="text-foreground">${item.price.toFixed(2)}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        key={breakdown.total}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        className="mt-3 flex justify-between border-t border-border pt-3 text-base font-bold"
      >
        <span className="text-foreground">Total</span>
        <span className="text-primary">${breakdown.total.toFixed(2)}</span>
      </motion.div>
    </div>
  );
}
