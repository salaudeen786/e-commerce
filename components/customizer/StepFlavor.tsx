"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FLAVOR_OPTIONS_CUSTOMIZER } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

export function StepFlavor() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("flavor");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Your Flavor</h3>
      <p className="mb-6 text-muted-foreground">Select the base flavor for your cake</p>
      <input type="hidden" {...register("flavor")} />
      <div className="grid grid-cols-2 gap-3">
        {FLAVOR_OPTIONS_CUSTOMIZER.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("flavor", option.value, { shouldValidate: true })}
              className={cn(
                "rounded-2xl border-2 p-5 text-left transition-all",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <p className="text-base font-semibold text-foreground">{option.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
            </button>
          );
        })}
      </div>
      {errors.flavor && <p className="mt-2 text-sm text-destructive">{errors.flavor.message}</p>}
    </div>
  );
}
