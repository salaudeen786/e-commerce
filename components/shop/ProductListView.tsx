"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { RatingStars } from "@/components/sections/RatingStars";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types";

interface ProductListViewProps {
  product: Product;
  className?: string;
}

export function ProductListView({ product, className }: ProductListViewProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const discount = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100
      )
    : 0;

  return (
    <motion.div
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:w-48">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, 192px"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.tags.includes("new") && (
            <Badge variant="accent" size="sm">
              New
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive" size="sm">
              -{discount}%
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">
              {product.category.name}
            </p>
            <Link href={`/product/${product.slug}`}>
              <h3 className="text-lg font-semibold text-foreground transition-colors hover:text-primary">
                {product.name}
              </h3>
            </Link>
          </div>
          <button
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => toggleItem(product)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                inWishlist
                  ? "fill-primary text-primary"
                  : "text-muted-foreground"
              )}
            />
          </button>
        </div>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <RatingStars rating={product.rating} showValue className="mt-2" />

        <div className="mt-auto flex items-center justify-between gap-4 pt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.comparePrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.slug}`}
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <Eye className="h-4 w-4" />
            </Link>
            <Button size="sm" onClick={() => addItem(product)}>
              <ShoppingBag className="mr-1 h-3.5 w-3.5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
