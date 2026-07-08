"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DECORATION_OPTIONS } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

const decorationEmoji: Record<string, string> = {
  "fresh-flowers": "🌸",
  piping: "✨",
  sprinkles: "🎉",
  "edible-gold": "⭐",
  macarons: "🍪",
  "fresh-fruit": "🍓",
  "chocolate-shards": "🍫",
};

export function StepDecoration() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const value = watch("decoration");

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Choose Decoration</h3>
      <p className="mb-6 text-muted-foreground">Select how to decorate your cake</p>
      <input type="hidden" {...register("decoration")} />
      <div className="grid grid-cols-2 gap-3">
        {DECORATION_OPTIONS.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setValue("decoration", option.value, { shouldValidate: true })}
              className={cn(
                "rounded-2xl border-2 p-5 text-left transition-all",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <span className="text-2xl">{decorationEmoji[option.value] || "🎂"}</span>
              <p className="mt-2 text-base font-semibold text-foreground">{option.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{option.description}</p>
              {option.price > 0 && (
                <p className="mt-1 text-xs font-medium text-primary">+${option.price}</p>
              )}
            </button>
          );
        })}
      </div>
      {errors.decoration && <p className="mt-2 text-sm text-destructive">{errors.decoration.message}</p>}
    </div>
  );
}
