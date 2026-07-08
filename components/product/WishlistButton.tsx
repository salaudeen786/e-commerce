"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import type { Product } from "@/types";

interface WishlistButtonProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { btn: "h-9 w-9", icon: "h-4 w-4" },
  md: { btn: "h-10 w-10", icon: "h-5 w-5" },
  lg: { btn: "h-12 w-12", icon: "h-6 w-6" },
};

export function WishlistButton({
  product,
  className,
  size = "md",
}: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const dims = sizeMap[size];

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => toggleItem(product)}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        "flex items-center justify-center rounded-xl border border-border bg-background transition-colors hover:bg-muted",
        dims.btn,
        className
      )}
    >
      <Heart
        className={cn(
          dims.icon,
          "transition-colors",
          inWishlist
            ? "fill-primary text-primary"
            : "text-muted-foreground"
        )}
      />
    </motion.button>
  );
}
