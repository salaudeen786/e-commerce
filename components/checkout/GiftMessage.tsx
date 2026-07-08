"use client";

import { Gift } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "@/types";

export function GiftMessage() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<CheckoutFormData>();
  const isGift = watch("isGift");
  const giftMessage = watch("giftMessage") || "";

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={isGift}
          onChange={(e) => setValue("isGift", e.target.checked)}
          className="h-4 w-4 rounded border-border accent-primary"
        />
        <Gift className="h-4 w-4 text-primary" />
        <span className="text-base font-semibold text-foreground">This is a gift</span>
      </label>
      {isGift && (
        <div className="mt-3">
          <textarea
            {...register("giftMessage")}
            placeholder="Add a gift message (max 200 characters)"
            maxLength={200}
            rows={3}
            className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">{giftMessage.length}/200</p>
          {errors.giftMessage && <p className="mt-1 text-xs text-destructive">{errors.giftMessage.message}</p>}
        </div>
      )}
    </div>
  );
}
