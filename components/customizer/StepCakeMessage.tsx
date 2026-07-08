"use client";

import { useFormContext } from "react-hook-form";
import type { CakeCustomizerData } from "@/types";

export function StepCakeMessage() {
  const { register, watch, formState: { errors } } = useFormContext<CakeCustomizerData>();
  const message = watch("cakeMessage") || "";

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Write a Cake Message</h3>
      <p className="mb-6 text-muted-foreground">Add a personal message on the cake (optional, +$5)</p>
      <textarea
        {...register("cakeMessage")}
        maxLength={100}
        rows={4}
        placeholder="E.g. Happy Birthday Sarah! 🎉"
        className="w-full resize-none rounded-2xl border-2 border-border bg-card p-4 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {message.length > 0 ? "+$5 for message inscription" : "No extra charge if left empty"}
        </p>
        <p className="text-xs text-muted-foreground">{message.length}/100</p>
      </div>
      {errors.cakeMessage && <p className="mt-1 text-sm text-destructive">{errors.cakeMessage.message}</p>}
    </div>
  );
}
