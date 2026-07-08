"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCheckoutStore } from "@/store/checkout-store";

export default function CheckoutFailedPage() {
  const orderError = useCheckoutStore((s) => s.orderError);
  const resetOrder = useCheckoutStore((s) => s.resetOrder);

  return (
    <div className="flex min-h-[80vh] items-center justify-center pb-24 pt-24 md:pt-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-lg text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
          >
            <XCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
          </motion.div>

          <h1 className="mb-2 text-3xl font-bold text-foreground">Order Failed</h1>
          <p className="mb-6 text-muted-foreground">
            {orderError || "Something went wrong while processing your order. Please try again."}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/checkout"
              onClick={resetOrder}
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Try Again
            </Link>
            <Link href="/cart" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              <ShoppingBag className="mr-1.5 h-4 w-4" />
              Go to Cart
            </Link>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
