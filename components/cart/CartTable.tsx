"use client";

import { AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { CartItemRow } from "./CartItemRow";

export function CartTable() {
  const items = useCartStore((s) => s.items);

  return (
    <div>
      <div className="hidden border-b border-border pb-3 md:flex md:items-center">
        <div className="flex-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Product
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="w-24 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Quantity
          </span>
          <span className="w-20 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Price
          </span>
          <span className="w-20 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Subtotal
          </span>
          <span className="w-24 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Actions
          </span>
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <CartItemRow key={item.itemId} item={item} layout="table" />
        ))}
      </AnimatePresence>
    </div>
  );
}
