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

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
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
      className={cn("group relative flex flex-col rounded-2xl bg-card", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.tags.includes("new") && (
            <Badge variant="accent" size="sm">
              New
            </Badge>
          )}
          {product.tags.includes("best-seller") && !product.tags.includes("new") && (
            <Badge variant="default" size="sm">
              Best Seller
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive" size="sm">
              -{discount}%
            </Badge>
          )}
        </div>

        <button
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleItem(product)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-colors hover:bg-white"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
            )}
          />
        </button>

        <div className="absolute inset-x-4 bottom-4 flex translate-y-4 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => addItem(product)}
          >
            <ShoppingBag className="mr-1 h-3.5 w-3.5" />
            Add to Cart
          </Button>
          <Link
            href={`/product/${product.slug}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "size-7 shrink-0"
            )}
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-3">
        <RatingStars rating={product.rating} showValue className="mb-1.5" />

        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {product.category.name}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-base font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.comparePrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
