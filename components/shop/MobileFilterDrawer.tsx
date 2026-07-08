"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import type { ShopFilters } from "@/types";

interface MobileFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  categories?: { slug: string; name: string; productCount: number }[];
  productCount: number;
}

export function MobileFilterDrawer({
  open,
  onOpenChange,
  filters,
  onChange,
  categories,
  productCount,
}: MobileFilterDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    },
    [onOpenChange]
  );

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onOpenChange(true)}
        className="lg:hidden"
      >
        <SlidersHorizontal className="mr-1.5 h-4 w-4" />
        Filters
      </Button>

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[100] lg:hidden"
            onKeyDown={handleKeyDown}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => onOpenChange(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm"
            >
              <FilterSidebar
                filters={filters}
                onChange={(f) => {
                  onChange(f);
                }}
                onClose={() => onOpenChange(false)}
                categories={categories}
                productCount={productCount}
                className="h-full rounded-none border-0"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
