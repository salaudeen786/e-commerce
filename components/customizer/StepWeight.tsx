"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { WEIGHT_OPTIONS_CUSTOMIZER } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

export function StepWeight() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("weight");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Size & Weight</h3>
      <p className="mb-6 text-muted-foreground">Select how big you want your cake</p>
      <input type="hidden" {...register("weight")} />
      <div className="grid grid-cols-2 gap-3">
        {WEIGHT_OPTIONS_CUSTOMIZER.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("weight", option.value, { shouldValidate: true })}
              className={cn(
                "rounded-2xl border-2 p-5 text-left transition-all",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <p className="text-base font-semibold text-foreground">{option.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
              {option.price > 0 && (
                <p className="mt-1 text-xs font-medium text-primary">+${option.price}</p>
              )}
            </button>
          );
        })}
      </div>
      {errors.weight && <p className="mt-2 text-sm text-destructive">{errors.weight.message}</p>}
    </div>
  );
}
