"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { DELIVERY_TIMES_CUSTOMIZER } from "@/constants/customizer-pricing";
import type { CheckoutFormData } from "@/types";

export function DeliveryDateTime() {
  const { register, setValue, watch, formState: { errors } } = useFormContext<CheckoutFormData>();
  const date = watch("deliveryDate");
  const time = watch("deliveryTime");

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 text-lg font-bold text-foreground">Delivery Date & Time</h3>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-foreground">Delivery Date *</label>
        <input type="hidden" {...register("deliveryDate")} />
        <input
          type="date"
          value={date}
          min={minDateStr}
          onChange={(e) => setValue("deliveryDate", e.target.value, { shouldValidate: true })}
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        {errors.deliveryDate && <p className="mt-1 text-xs text-destructive">{errors.deliveryDate.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-foreground">Delivery Time *</label>
        <input type="hidden" {...register("deliveryTime")} />
        <div className="grid grid-cols-2 gap-2">
          {DELIVERY_TIMES_CUSTOMIZER.map((slot) => (
            <button
              key={slot.value}
              type="button"
              onClick={() => setValue("deliveryTime", slot.value, { shouldValidate: true })}
              className={cn(
                "rounded-lg border-2 px-3 py-2.5 text-left text-sm transition-all",
                time === slot.value
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-muted-foreground/30"
              )}
            >
              <span className="font-medium">{slot.label}</span>
              {slot.value === "express" && <span className="ml-1.5 text-xs text-primary">+$10</span>}
            </button>
          ))}
        </div>
        {errors.deliveryTime && <p className="mt-1 text-xs text-destructive">{errors.deliveryTime.message}</p>}
      </div>
    </div>
  );
}
