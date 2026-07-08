"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { CREAM_OPTIONS } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

const creamColors: Record<string, string> = {
  buttercream: "bg-yellow-50",
  "cream-cheese": "bg-white",
  ganache: "bg-stone-700",
  whipped: "bg-slate-50",
  fondant: "bg-pink-50",
};

export function StepCream() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("cream");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Cream & Frosting</h3>
      <p className="mb-6 text-muted-foreground">Select the type of cream or frosting</p>
      <input type="hidden" {...register("cream")} />
      <div className="grid grid-cols-2 gap-3">
        {CREAM_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("cream", option.value, { shouldValidate: true })}
              className={cn(
                "rounded-2xl border-2 p-5 text-left transition-all",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <div className={cn("mb-2 h-8 w-16 rounded-full border border-border", creamColors[option.value] || "bg-white")} />
              <p className="text-base font-semibold text-foreground">{option.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
              {option.price > 0 && (
                <p className="mt-1 text-xs font-medium text-primary">+${option.price}</p>
              )}
            </button>
          );
        })}
      </div>
      {errors.cream && <p className="mt-2 text-sm text-destructive">{errors.cream.message}</p>}
    </div>
  );
}
