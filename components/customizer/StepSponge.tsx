"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { SPONGE_OPTIONS } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

const spongeColors: Record<string, string> = {
  vanilla: "bg-amber-100",
  chocolate: "bg-amber-900",
  "red-velvet": "bg-red-700",
  lemon: "bg-yellow-200",
  carrot: "bg-orange-300",
};

export function StepSponge() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("sponge");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Sponge</h3>
      <p className="mb-6 text-muted-foreground">Select the cake sponge type</p>
      <input type="hidden" {...register("sponge")} />
      <div className="grid grid-cols-2 gap-3">
        {SPONGE_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("sponge", option.value, { shouldValidate: true })}
              className={cn(
                "rounded-2xl border-2 p-5 text-left transition-all",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <div className={cn("mb-2 h-8 w-16 rounded-lg", spongeColors[option.value] || "bg-amber-100")} />
              <p className="text-base font-semibold text-foreground">{option.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
              {option.price > 0 && (
                <p className="mt-1 text-xs font-medium text-primary">+${option.price}</p>
              )}
            </button>
          );
        })}
      </div>
      {errors.sponge && <p className="mt-2 text-sm text-destructive">{errors.sponge.message}</p>}
    </div>
  );
}
