"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (Math.abs(diff) < 0.01) {
      setDisplay(value);
      return;
    }
    const duration = 300;
    const startTime = performance.now();
    let raf: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + diff * eased);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return <span ref={ref}>${display.toFixed(2)}</span>;
}

export function CartSummary() {
  const subtotal = useCartStore((s) => s.subtotal());
  const discount = useCartStore((s) => s.discountAmount());
  const shipping = useCartStore((s) => s.shipping);
  const giftWrap = useCartStore((s) => s.giftWrap);
  const total = useCartStore((s) => s.total());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h3 className="mb-4 text-lg font-bold text-foreground">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">
            <AnimatedNumber value={subtotal} />
          </span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-emerald-600 dark:text-emerald-400">
              Discount ({useCartStore.getState().coupon?.code})
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              -<AnimatedNumber value={discount} />
            </span>
          </div>
        )}
        {giftWrap.enabled && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Gift Wrap</span>
            <span className="font-medium text-foreground">
              +${giftWrap.price.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-foreground">
            {shipping.cost === 0 ? (
              <span className="text-emerald-600 dark:text-emerald-400">FREE</span>
            ) : (
              <AnimatedNumber value={shipping.cost} />
            )}
          </span>
        </div>
        <hr className="border-border" />
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-foreground">Total</span>
          <span className="text-xl font-bold text-primary">
            <AnimatedNumber value={total} />
          </span>
        </div>
      </div>
      <Button className="mt-6 w-full" size="lg">
        Proceed to Checkout
      </Button>
    </motion.div>
  );
}
