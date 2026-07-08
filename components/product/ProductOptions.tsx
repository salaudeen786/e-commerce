"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FLAVOR_OPTIONS, WEIGHT_OPTIONS } from "@/constants";

interface ProductOptionsProps {
  selectedFlavor: string | null;
  selectedWeight: string | null;
  onFlavorChange: (flavor: string) => void;
  onWeightChange: (weight: string) => void;
  flavors?: string[];
  weights?: string[];
}

export function ProductOptions({
  selectedFlavor,
  selectedWeight,
  onFlavorChange,
  onWeightChange,
  flavors,
  weights,
}: ProductOptionsProps) {
  const availableFlavors = FLAVOR_OPTIONS.filter(
    (f) => !flavors || flavors.length === 0 || flavors.includes(f.value)
  );
  const availableWeights = WEIGHT_OPTIONS.filter(
    (w) => !weights || weights.length === 0 || weights.includes(w.value)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Flavor
        </label>
        <div className="flex flex-wrap gap-2">
          {availableFlavors.map((flavor) => (
            <button
              key={flavor.value}
              onClick={() => onFlavorChange(flavor.value)}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                selectedFlavor === flavor.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
              )}
            >
              {flavor.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">
          Size / Weight
        </label>
        <div className="flex flex-wrap gap-2">
          {availableWeights.map((weight) => (
            <button
              key={weight.value}
              onClick={() => onWeightChange(weight.value)}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-medium transition-all",
                selectedWeight === weight.value
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
              )}
            >
              {weight.label}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
