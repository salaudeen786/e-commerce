"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { SHAPE_OPTIONS } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

const shapeIcons: Record<string, string> = {
  round: "●",
  square: "■",
  heart: "♥",
  tiered: "⏍",
  sheet: "▬",
};

export function StepShape() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("shape");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Shape</h3>
      <p className="mb-6 text-muted-foreground">Select the shape of your cake</p>
      <input type="hidden" {...register("shape")} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SHAPE_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("shape", option.value, { shouldValidate: true })}
              className={cn(
                "rounded-2xl border-2 p-5 text-center transition-all",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <span className="text-3xl">{shapeIcons[option.value] || "○"}</span>
              <p className="mt-2 text-sm font-semibold text-foreground">{option.label}</p>
              <p className="text-xs text-muted-foreground">{option.description}</p>
              {option.price > 0 && (
                <p className="mt-1 text-xs font-medium text-primary">+${option.price}</p>
              )}
            </button>
          );
        })}
      </div>
      {errors.shape && <p className="mt-2 text-sm text-destructive">{errors.shape.message}</p>}
    </div>
  );
}
