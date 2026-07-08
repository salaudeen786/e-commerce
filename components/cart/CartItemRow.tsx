"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import type { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
  layout?: "table" | "drawer";
}

export function CartItemRow({ item, layout = "table" }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const moveToSaved = useCartStore((s) => s.moveToSaved);
  const moveToWishlist = useCartStore((s) => s.moveToWishlist);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const lineTotal = item.product.price * item.quantity;

  const handleMoveToWishlist = () => {
    addToWishlist(item.product);
    moveToWishlist(item.itemId);
  };

  if (layout === "drawer") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="flex gap-3 border-b border-border pb-3 last:border-b-0"
      >
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={`/product/${item.product.slug}`}
            className="line-clamp-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {item.product.name}
          </Link>
          {item.customizations && (
            <div className="mt-0.5 flex flex-wrap gap-1">
              {item.customizations.flavor && (
                <Badge variant="outline" size="sm">{item.customizations.flavor}</Badge>
              )}
              {item.customizations.weight && (
                <Badge variant="outline" size="sm">{item.customizations.weight}</Badge>
              )}
            </div>
          )}
          <div className="mt-2 flex items-center justify-between">
            <QuantitySelector
              value={item.quantity}
              onChange={(q) => updateQuantity(item.itemId, q)}
              min={1}
              max={99}
              className="h-7 [&>button]:h-7 [&>button]:w-7 [&>span]:h-7 [&>span]:w-10 [&>span]:text-xs"
            />
            <span className="text-sm font-semibold text-foreground">
              ${(lineTotal).toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={() => removeItem(item.itemId)}
          className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex flex-col gap-4 border-b border-border py-4 md:flex-row md:items-center"
    >
      <div className="flex flex-1 items-center gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="min-w-0">
          <Link
            href={`/product/${item.product.slug}`}
            className="line-clamp-1 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            {item.product.name}
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {item.product.category.name}
          </p>
          {item.customizations && (
            <div className="mt-1 flex flex-wrap gap-1">
              {item.customizations.flavor && (
                <Badge variant="outline" size="sm">{item.customizations.flavor}</Badge>
              )}
              {item.customizations.weight && (
                <Badge variant="outline" size="sm">{item.customizations.weight}</Badge>
              )}
              {item.customizations.cakeMessage && (
                <Badge variant="outline" size="sm">Message</Badge>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between md:gap-6">
        <div className="md:hidden">
          <span className="text-xs text-muted-foreground">Unit Price</span>
          <p className="text-sm font-medium text-foreground">
            ${item.product.price.toFixed(2)}
          </p>
        </div>

        <QuantitySelector
          value={item.quantity}
          onChange={(q) => updateQuantity(item.itemId, q)}
          min={1}
          max={99}
        />

        <div className="hidden text-center md:block">
          <p className="text-sm font-medium text-foreground">
            ${item.product.price.toFixed(2)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold text-foreground">
            ${(lineTotal).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleMoveToWishlist}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            aria-label="Move to wishlist"
          >
            <Heart className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => moveToSaved(item.itemId)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            aria-label="Save for later"
          >
            <Bookmark className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => removeItem(item.itemId)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
            aria-label="Remove item"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
