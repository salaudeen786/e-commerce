"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { COLOR_THEME_OPTIONS } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

export function StepColorTheme() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("colorTheme");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Color Theme</h3>
      <p className="mb-6 text-muted-foreground">Select the color palette for your cake</p>
      <input type="hidden" {...register("colorTheme")} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COLOR_THEME_OPTIONS.map((option) => {
          const selected = value === option.value;
          const isRainbow = option.value === "rainbow";
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("colorTheme", option.value, { shouldValidate: true })}
              className={cn(
                "rounded-2xl border-2 p-4 text-center transition-all",
                selected
                  ? "border-primary ring-1 ring-primary"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <div
                className={cn(
                  "mx-auto h-12 w-12 rounded-full border border-border",
                  isRainbow && "bg-gradient-to-br from-red-400 via-yellow-400 via-green-400 to-blue-400"
                )}
                style={!isRainbow ? { backgroundColor: option.color } : undefined}
              />
              <p className="mt-2 text-sm font-semibold text-foreground">{option.label}</p>
              {option.price > 0 && (
                <p className="text-xs font-medium text-primary">+${option.price}</p>
              )}
            </button>
          );
        })}
      </div>
      {errors.colorTheme && <p className="mt-2 text-sm text-destructive">{errors.colorTheme.message}</p>}
    </div>
  );
}
