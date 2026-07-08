"use client";

import { Gift } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function GiftWrapOptions() {
  const giftWrap = useCartStore((s) => s.giftWrap);
  const setGiftWrap = useCartStore((s) => s.setGiftWrap);
  const toggleGiftWrap = useCartStore((s) => s.toggleGiftWrap);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-3 text-base font-semibold text-foreground">
        Gift Wrap
      </h3>
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={giftWrap.enabled}
          onChange={toggleGiftWrap}
          className="h-4 w-4 rounded border-border accent-primary"
        />
        <Gift className="h-4 w-4 text-primary" />
        <span className="flex-1 text-sm text-foreground">
          Add gift wrapping
        </span>
        <span className="text-sm font-medium text-foreground">
          +${giftWrap.price.toFixed(2)}
        </span>
      </label>
      {giftWrap.enabled && (
        <div className="mt-3 pl-7">
          <textarea
            placeholder="Add a gift message (optional, max 80 chars)"
            maxLength={80}
            value={giftWrap.message || ""}
            onChange={(e) => setGiftWrap({ message: e.target.value })}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            rows={2}
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {(giftWrap.message || "").length}/80
          </p>
        </div>
      )}
    </div>
  );
}
