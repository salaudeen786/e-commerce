"use client";

import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

export function CartStickyCheckout() {
  const total = useCartStore((s) => s.total());
  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          <p className="text-lg font-bold text-foreground">
            ${total.toFixed(2)}
          </p>
        </div>
        <Button size="lg" className="px-8">
          Checkout
        </Button>
      </div>
    </div>
  );
}
