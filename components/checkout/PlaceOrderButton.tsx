"use client";

import { Loader2, Lock } from "lucide-react";
import { useCheckoutStore } from "@/store/checkout-store";

interface PlaceOrderButtonProps {
  total: number;
  disabled?: boolean;
}

export function PlaceOrderButton({ total, disabled }: PlaceOrderButtonProps) {
  const orderStatus = useCheckoutStore((s) => s.orderStatus);
  const isProcessing = orderStatus === "processing";

  return (
    <button
      type="submit"
      disabled={disabled || isProcessing}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isProcessing ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Processing…
        </>
      ) : (
        <>
          <Lock className="h-4 w-4" />
          Place Order — ${total.toFixed(2)}
        </>
      )}
    </button>
  );
}
