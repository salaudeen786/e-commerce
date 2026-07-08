"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutSuccessPage() {
  const orderId = useCheckoutStore((s) => s.orderId);
  const items = useCartStore((s) => s.items);

  return (
    <div className="flex min-h-[80vh] items-center justify-center pb-24 pt-24 md:pt-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
          >
            <CheckCircle className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </motion.div>

          <h1 className="mb-2 text-3xl font-bold text-foreground">Order Confirmed!</h1>
          <p className="mb-2 text-muted-foreground">
            Thank you for your order. You&apos;ll receive a confirmation email shortly.
          </p>

          {orderId && (
            <div className="mb-8 inline-block rounded-lg bg-secondary px-4 py-2">
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="text-lg font-bold text-foreground">{orderId}</p>
            </div>
          )}

          <div className="mb-8 rounded-2xl border border-border bg-card p-4 text-left">
            <h3 className="mb-2 text-sm font-semibold text-foreground">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.itemId} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-foreground">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <hr className="my-2 border-border" />
            <div className="flex items-center justify-between text-sm font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary">
                ${items.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/shop" className={cn(buttonVariants({ variant: "default", size: "lg" }))}>
              Continue Shopping
            </Link>
            <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
