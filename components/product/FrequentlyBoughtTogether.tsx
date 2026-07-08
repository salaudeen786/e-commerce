"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RatingStars } from "@/components/sections/RatingStars";
import { getBoughtTogether } from "@/mocks/product-utils";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types";

interface FrequentlyBoughtTogetherProps {
  product: Product;
}

export function FrequentlyBoughtTogether({
  product,
}: FrequentlyBoughtTogetherProps) {
  const addItem = useCartStore((s) => s.addItem);
  const together = useMemo(() => getBoughtTogether(product, 3), [product]);

  if (together.length === 0) return null;

  const allItems = [product, ...together];

  const totalPrice = allItems.reduce((acc, p) => acc + p.price, 0);
  const saved = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100
      )
    : 0;

  const handleAddAll = () => {
    allItems.forEach((p) => addItem(p));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border bg-card p-6"
    >
      <h3 className="mb-5 text-2xl font-bold text-foreground">
        Frequently Bought Together
      </h3>

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        {allItems.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-3">
            {idx > 0 && (
              <Plus className="h-5 w-5 shrink-0 text-muted-foreground" />
            )}
            <Link
              href={`/product/${item.slug}`}
              className="group relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:w-24"
            >
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-cover transition-transform group-hover:scale-110"
                sizes="96px"
              />
            </Link>
            <div className="min-w-0">
              <Link href={`/product/${item.slug}`}>
                <p className="truncate text-sm font-medium text-foreground transition-colors hover:text-primary">
                  {item.name}
                </p>
              </Link>
              <RatingStars rating={item.rating} size="sm" className="mt-0.5" />
              <p className="mt-0.5 text-sm font-bold text-primary">
                ${item.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
        <div>
          <p className="text-sm text-muted-foreground">
            Total price:{" "}
            <span className="text-lg font-bold text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </p>
          {saved > 0 && (
            <p className="text-xs text-emerald-600">
              You save {saved}% on the main item!
            </p>
          )}
        </div>
        <Button onClick={handleAddAll}>
          <ShoppingBag className="mr-1.5 h-4 w-4" />
          Add All to Cart
        </Button>
      </div>
    </motion.div>
  );
}
