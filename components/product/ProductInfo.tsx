"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { RatingStars } from "@/components/sections/RatingStars";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const discount = product.comparePrice
    ? Math.round(
        ((product.comparePrice - product.price) / product.comparePrice) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap items-center gap-2">
        {product.tags.includes("new") && (
          <Badge variant="accent" size="sm">
            New Arrival
          </Badge>
        )}
        {product.tags.includes("best-seller") && (
          <Badge variant="default" size="sm">
            Best Seller
          </Badge>
        )}
        {discount > 0 && (
          <Badge variant="destructive" size="sm">
            -{discount}% Off
          </Badge>
        )}
      </div>

      <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-4">
        <RatingStars rating={product.rating} size="md" showValue />
        <span className="text-sm text-muted-foreground">
          ({product.reviewCount} reviews)
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </span>
        {product.comparePrice && (
          <span className="text-lg text-muted-foreground line-through">
            ${product.comparePrice.toFixed(2)}
          </span>
        )}
      </div>

      <p className="mt-4 leading-relaxed text-muted-foreground">
        {product.description}
      </p>
    </motion.div>
  );
}
