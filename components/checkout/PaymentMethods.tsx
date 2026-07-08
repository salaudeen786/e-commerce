"use client";

import { useFormContext } from "react-hook-form";
import { CreditCard, Wallet, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CheckoutFormData, PaymentMethod } from "@/types";

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { value: "credit-card", label: "Credit Card", icon: <CreditCard className="h-5 w-5" /> },
  { value: "paypal", label: "PayPal", icon: <Wallet className="h-5 w-5" /> },
  { value: "stripe", label: "Stripe", icon: <Globe className="h-5 w-5" /> },
];

export function PaymentMethods() {
  const { register, watch, setValue, formState: { errors } } = useFormContext<CheckoutFormData>();
  const method = watch("paymentMethod");

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 text-lg font-bold text-foreground">Payment Method</h3>
      <div className="space-y-2">
        {PAYMENT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors",
              method === opt.value && "border-primary bg-primary/5"
            )}
          >
            <input
              type="radio"
              value={opt.value}
              checked={method === opt.value}
              onChange={() => setValue("paymentMethod", opt.value, { shouldValidate: true })}
              className="h-4 w-4 accent-primary"
            />
            <span className="text-muted-foreground">{opt.icon}</span>
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
          </label>
        ))}
      </div>
      {errors.paymentMethod && <p className="mt-1 text-xs text-destructive">{errors.paymentMethod.message}</p>}

      {method === "credit-card" && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">Card Number *</label>
            <input
              {...register("cardNumber")}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
                e.target.value = formatted;
                register("cardNumber").onChange(e);
              }}
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {errors.cardNumber && <p className="mt-1 text-xs text-destructive">{errors.cardNumber.message}</p>}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Expiry *</label>
              <input
                {...register("cardExpiry")}
                placeholder="MM/YY"
                maxLength={5}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, "").slice(0, 4);
                  if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2);
                  e.target.value = val;
                  register("cardExpiry").onChange(e);
                }}
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {errors.cardExpiry && <p className="mt-1 text-xs text-destructive">{errors.cardExpiry.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">CVC *</label>
              <input
                {...register("cardCvc")}
                placeholder="***"
                maxLength={4}
                type="password"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {errors.cardCvc && <p className="mt-1 text-xs text-destructive">{errors.cardCvc.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Name on Card *</label>
              <input
                {...register("cardName")}
                placeholder="John Doe"
                className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {errors.cardName && <p className="mt-1 text-xs text-destructive">{errors.cardName.message}</p>}
            </div>
          </div>
        </div>
      )}

      {method === "paypal" && (
        <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/20 dark:text-amber-300">
          You&apos;ll be redirected to PayPal to complete your payment.
        </div>
      )}

      {method === "stripe" && (
        <div className="mt-4 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-800 dark:bg-indigo-950/20 dark:text-indigo-300">
          You&apos;ll be redirected to Stripe to complete your payment.
        </div>
      )}
    </div>
  );
}
