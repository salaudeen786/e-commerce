"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
        <ShoppingBag className="h-12 w-12 text-primary/60" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-foreground">
        Your cart is empty
      </h2>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        Looks like you haven&apos;t added anything yet. Browse our collection of
        premium cakes, chocolates, and gifts.
      </p>
      <Link href="/shop" className={cn(buttonVariants({ variant: "default" }))}>
        Start Shopping
      </Link>
    </motion.div>
  );
}
