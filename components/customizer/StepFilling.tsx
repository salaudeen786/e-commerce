"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FILLING_OPTIONS } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

export function StepFilling() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("filling");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Filling</h3>
      <p className="mb-6 text-muted-foreground">Select the filling between layers</p>
      <input type="hidden" {...register("filling")} />
      <div className="grid grid-cols-2 gap-3">
        {FILLING_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("filling", option.value, { shouldValidate: true })}
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
      {errors.filling && <p className="mt-2 text-sm text-destructive">{errors.filling.message}</p>}
    </div>
  );
}
