"use client";

import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "@/types";

export function OrderNotes() {
  const { register, watch, formState: { errors } } = useFormContext<CheckoutFormData>();
  const notes = watch("orderNotes") || "";

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-3 text-lg font-bold text-foreground">Order Notes</h3>
      <textarea
        {...register("orderNotes")}
        placeholder="Special instructions for your order..."
        maxLength={500}
        rows={3}
        className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p className="mt-1 text-right text-xs text-muted-foreground">{notes.length}/500</p>
      {errors.orderNotes && <p className="mt-1 text-xs text-destructive">{errors.orderNotes.message}</p>}
    </div>
  );
}
