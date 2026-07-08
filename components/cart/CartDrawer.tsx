"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CartItemRow } from "./CartItemRow";

export function CartDrawer() {
  const isCartOpen = useUIStore((s) => s.isCartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const itemCount = useCartStore((s) => s.itemCount());

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    },
    [closeCart]
  );

  useEffect(() => {
    if (isCartOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Shopping Cart
                <span className="text-sm font-normal text-muted-foreground">
                  ({itemCount})
                </span>
              </h2>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <ShoppingBag className="h-8 w-8 text-primary/60" />
                </div>
                <p className="mb-1 text-base font-semibold text-foreground">
                  Your cart is empty
                </p>
                <p className="mb-6 text-sm text-muted-foreground">
                  Add some sweet treats to get started!
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout" initial={false}>
                      {items.map((item) => (
                        <CartItemRow
                          key={item.itemId}
                          item={item}
                          layout="drawer"
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="border-t border-border px-5 py-4">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "mt-3 flex w-full"
                    )}
                  >
                    View Full Cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
