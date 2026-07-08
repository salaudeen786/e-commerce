"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { checkoutSchema } from "@/lib/schemas";
import type { z } from "zod";
import { DeliveryAddressForm } from "./DeliveryAddressForm";
import { SavedAddresses } from "./SavedAddresses";
import { DeliveryDateTime } from "./DeliveryDateTime";
import { OrderNotes } from "./OrderNotes";
import { GiftMessage } from "./GiftMessage";
import { PaymentMethods } from "./PaymentMethods";
import { TermsCheckbox } from "./TermsCheckbox";
import { PlaceOrderButton } from "./PlaceOrderButton";
import { CheckoutSummary } from "./CheckoutSummary";
import { CheckoutCoupon } from "./CheckoutCoupon";
import { EstimatedDelivery } from "./EstimatedDelivery";
const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  apartment: "",
  city: "",
  state: "",
  zip: "",
  savedAddressId: "",
  deliveryDate: "",
  deliveryTime: "",
  orderNotes: "",
  isGift: false,
  giftMessage: "",
  paymentMethod: "credit-card" as const,
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
  cardName: "",
  acceptedTerms: false,
};

export function CheckoutForm() {
  const router = useRouter();
  const cartItems = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const giftWrap = useCartStore((s) => s.giftWrap);
  const shipping = useCartStore((s) => s.shipping);
  const discount = useCartStore((s) => s.discountAmount());
  const subtotal = useCartStore((s) => s.subtotal());
  const coupon = useCartStore((s) => s.coupon);
  const clearCart = useCartStore((s) => s.clearCart);
  const { orderStatus, placeOrder } = useCheckoutStore();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace("/cart");
    }
  }, [cartItems.length, router]);

  useEffect(() => {
    if (orderStatus === "success") {
      clearCart();
      router.push("/checkout/success");
    } else if (orderStatus === "failed") {
      router.push("/checkout/failed");
    }
  }, [orderStatus, router, clearCart]);

  if (cartItems.length === 0) return null;

  const onSubmit = async () => {
    await placeOrder();
  };

  const afterDiscount = subtotal - discount;
  const tax = afterDiscount * 0.08;

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <SavedAddresses />
          <DeliveryAddressForm />
          <DeliveryDateTime />
          <OrderNotes />
          <GiftMessage />
          <PaymentMethods />
          <TermsCheckbox />
          <PlaceOrderButton total={total + tax} />
        </div>

        <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <CheckoutSummary />
          <CheckoutCoupon />
          <EstimatedDelivery />
        </div>
      </form>
    </FormProvider>
  );
}
