"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function AddToCartButton({
  onClick,
  disabled,
  className,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    onClick();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Button
        size="lg"
        className={className}
        disabled={disabled || isAdded}
        onClick={handleClick}
      >
        {isAdded ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-2"
          >
            <Check className="h-5 w-5" />
            Added to Cart!
          </motion.span>
        ) : (
          <span className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Add to Cart
          </span>
        )}
      </Button>
    </motion.div>
  );
}
