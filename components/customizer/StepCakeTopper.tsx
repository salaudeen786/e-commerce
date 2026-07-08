"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CAKE_TOPPER_OPTIONS } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

export function StepCakeTopper() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("cakeTopper");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Cake Topper</h3>
      <p className="mb-6 text-muted-foreground">Select a topper or skip this step</p>
      <input type="hidden" {...register("cakeTopper")} />
      <div className="grid grid-cols-2 gap-3">
        {CAKE_TOPPER_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("cakeTopper", option.value, { shouldValidate: true })}
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
              {option.value === "none" && (
                <p className="mt-1 text-xs text-muted-foreground">No extra charge</p>
              )}
            </button>
          );
        })}
      </div>
      {errors.cakeTopper && <p className="mt-2 text-sm text-destructive">{errors.cakeTopper.message}</p>}
    </div>
  );
}
