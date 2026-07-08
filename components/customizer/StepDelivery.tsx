"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DELIVERY_TIMES_CUSTOMIZER } from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

export function StepDelivery() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const date = watch("deliveryDate");
  const time = watch("deliveryTime");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Delivery Details</h3>
      <p className="mb-6 text-muted-foreground">Choose when to receive your cake</p>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-semibold text-foreground">Delivery Date</label>
        <input type="hidden" {...register("deliveryDate")} />
        <input
          type="date"
          value={date}
          min={minDateStr}
          onChange={(e) => setValue("deliveryDate", e.target.value, { shouldValidate: true })}
          className="w-full rounded-2xl border-2 border-border bg-card px-4 py-3 text-base text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {errors.deliveryDate && <p className="mt-1 text-sm text-destructive">{errors.deliveryDate.message}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-foreground">Delivery Time</label>
        <input type="hidden" {...register("deliveryTime")} />
        <div className="grid grid-cols-2 gap-3">
          {DELIVERY_TIMES_CUSTOMIZER.map((slot) => {
            const selected = time === slot.value;
            return (
              <button
                key={slot.value}
                type="button"
                onClick={() => setValue("deliveryTime", slot.value, { shouldValidate: true })}
                className={cn(
                  "rounded-2xl border-2 p-4 text-left transition-all",
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-muted-foreground/30"
                )}
              >
                <p className="text-sm font-semibold text-foreground">{slot.label}</p>
                {slot.value === "express" && (
                  <p className="mt-1 text-xs font-medium text-primary">+$10</p>
                )}
              </button>
            );
          })}
        </div>
        {errors.deliveryTime && <p className="mt-1 text-sm text-destructive">{errors.deliveryTime.message}</p>}
      </div>
    </div>
  );
}
