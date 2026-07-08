"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/product/QuantitySelector";

interface StickyAddToCartProps {
  price: number;
  comparePrice?: number;
  onAddToCart: () => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  inStock: boolean;
}

export function StickyAddToCart({
  price,
  comparePrice,
  onAddToCart,
  quantity,
  onQuantityChange,
  inStock,
}: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 400;
      setVisible(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = () => {
    onAddToCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-lg"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-xl font-bold text-primary">
                  ${price.toFixed(2)}
                </span>
                {comparePrice && (
                  <span className="ml-2 text-sm text-muted-foreground line-through">
                    ${comparePrice.toFixed(2)}
                  </span>
                )}
              </div>
              <QuantitySelector
                value={quantity}
                onChange={onQuantityChange}
                className="h-9 [&_button]:h-9 [&_button]:w-9 [&_span]:h-9 [&_span]:w-12"
              />
            </div>
            <Button
              size="lg"
              disabled={!inStock || isAdded}
              onClick={handleAdd}
            >
              {isAdded ? (
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  Added!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  {inStock ? "Add to Cart" : "Out of Stock"}
                </span>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
