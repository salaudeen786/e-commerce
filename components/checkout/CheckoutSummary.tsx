"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { TAX_RATE } from "@/constants";

export function CheckoutSummary() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const discount = useCartStore((s) => s.discountAmount());
  const shipping = useCartStore((s) => s.shipping);
  const giftWrap = useCartStore((s) => s.giftWrap);
  const total = useCartStore((s) => s.total());
  const coupon = useCartStore((s) => s.coupon);
  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * TAX_RATE;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="mb-4 text-lg font-bold text-foreground">Order Summary</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.itemId} className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="48px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm font-medium text-foreground">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold text-foreground">
              ${(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <hr className="my-4 border-border" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-emerald-600 dark:text-emerald-400">
              Discount ({coupon?.code})
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}
        {giftWrap.enabled && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gift Wrap</span>
            <span className="font-medium text-foreground">+${giftWrap.price.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium text-foreground">
            {shipping.cost === 0 ? <span className="text-emerald-600 dark:text-emerald-400">FREE</span> : `$${shipping.cost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
          <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
        </div>
      </div>

      <hr className="my-4 border-border" />

      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-foreground">Total</span>
        <span className="text-xl font-bold text-primary">${(total + tax).toFixed(2)}</span>
      </div>
    </div>
  );
}
