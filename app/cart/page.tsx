"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CartTable } from "@/components/cart/CartTable";
import { CartSummary } from "@/components/cart/CartSummary";
import { CouponInput } from "@/components/cart/CouponInput";
import { ShippingCalculator } from "@/components/cart/ShippingCalculator";
import { GiftWrapOptions } from "@/components/cart/GiftWrapOptions";
import { SavedForLater } from "@/components/cart/SavedForLater";
import { CartRecommended } from "@/components/cart/CartRecommended";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { CartSkeleton } from "@/components/cart/CartSkeleton";
import { CartStickyCheckout } from "@/components/cart/CartStickyCheckout";

function CartContent() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <Container>
        <EmptyCart />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartTable />
            <SavedForLater />
            <CartRecommended />
          </div>
          <div className="space-y-5">
            <CartSummary />
            <CouponInput />
            <ShippingCalculator />
            <GiftWrapOptions />
          </div>
        </div>
      </Container>
      <CartStickyCheckout />
    </>
  );
}

export default function CartPage() {
  return (
    <div className="pb-24 pt-24 md:pt-28">
      <Container className="mb-8">
        <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Cart</span>
        </nav>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Shopping Cart
        </h1>
      </Container>
      <Suspense
        fallback={
          <Container>
            <CartSkeleton />
          </Container>
        }
      >
        <CartContent />
      </Suspense>
    </div>
  );
}
