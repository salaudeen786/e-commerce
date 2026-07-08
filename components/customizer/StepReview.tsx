"use client";

import { useFormContext } from "react-hook-form";
import {
  FLAVOR_OPTIONS_CUSTOMIZER,
  WEIGHT_OPTIONS_CUSTOMIZER,
  SHAPE_OPTIONS,
  SPONGE_OPTIONS,
  CREAM_OPTIONS,
  FILLING_OPTIONS,
  DECORATION_OPTIONS,
  COLOR_THEME_OPTIONS,
  CAKE_TOPPER_OPTIONS,
} from "@/constants/customizer-pricing";
import type { CakeCustomizerData } from "@/types";

function findLabel<T extends { value: string; label: string }>(options: readonly T[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

interface ReviewRowProps {
  label: string;
  value: string;
}

function ReviewRow({ label, value }: ReviewRowProps) {
  if (!value || value === "none") return null;
  return (
    <div className="flex justify-between border-b border-border py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground capitalize">{value.replace(/-/g, " ")}</span>
    </div>
  );
}

export function StepReview() {
  const { watch } = useFormContext<CakeCustomizerData>();
  const data = watch();

  return (
    <div>
      <h3 className="mb-1 text-2xl font-bold text-foreground">Review Your Cake</h3>
      <p className="mb-6 text-muted-foreground">Please confirm all your selections before ordering</p>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h4 className="mb-4 text-lg font-bold text-foreground">Cake Details</h4>
        <ReviewRow label="Flavor" value={findLabel(FLAVOR_OPTIONS_CUSTOMIZER, data.flavor)} />
        <ReviewRow label="Weight" value={findLabel(WEIGHT_OPTIONS_CUSTOMIZER, data.weight)} />
        <ReviewRow label="Shape" value={findLabel(SHAPE_OPTIONS, data.shape)} />
        <ReviewRow label="Sponge" value={findLabel(SPONGE_OPTIONS, data.sponge)} />
        <ReviewRow label="Cream" value={findLabel(CREAM_OPTIONS, data.cream)} />
        <ReviewRow label="Filling" value={findLabel(FILLING_OPTIONS, data.filling)} />
        <ReviewRow label="Decoration" value={findLabel(DECORATION_OPTIONS, data.decoration)} />
        <ReviewRow label="Color Theme" value={findLabel(COLOR_THEME_OPTIONS, data.colorTheme)} />
        <ReviewRow label="Cake Topper" value={findLabel(CAKE_TOPPER_OPTIONS, data.cakeTopper)} />
        {data.cakeMessage && (
          <ReviewRow label="Message" value={`"${data.cakeMessage}"`} />
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-6">
        <h4 className="mb-4 text-lg font-bold text-foreground">Delivery</h4>
        <ReviewRow label="Delivery Date" value={data.deliveryDate || "Not set"} />
        <ReviewRow label="Delivery Time" value={data.deliveryTime?.replace(/-/g, " ") || "Not set"} />
      </div>

      {data.referenceImage && (
        <div className="mt-4 rounded-2xl border border-border bg-card p-6">
          <h4 className="mb-3 text-lg font-bold text-foreground">Reference Image</h4>
          <p className="text-sm text-muted-foreground">Image uploaded as reference</p>
        </div>
      )}
    </div>
  );
}
