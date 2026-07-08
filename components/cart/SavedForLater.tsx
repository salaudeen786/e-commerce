"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cart-store";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SavedForLater() {
  const savedItems = useCartStore((s) => s.savedItems);
  const moveToCart = useCartStore((s) => s.moveToCart);
  const removeSaved = useCartStore((s) => s.removeSaved);

  if (savedItems.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-lg font-bold text-foreground">
        Saved for Later ({savedItems.length})
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {savedItems.map((saved) => (
          <motion.div
            key={saved.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
          >
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={saved.product.images[0]}
                alt={saved.product.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${saved.product.slug}`}
                className="line-clamp-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {saved.product.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                ${saved.product.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => moveToCart(saved.id)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-7"
                )}
                aria-label="Move to cart"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => removeSaved(saved.id)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-7 text-muted-foreground hover:text-destructive"
                )}
                aria-label="Remove saved item"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
