"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { CheckoutSkeleton } from "@/components/checkout/CheckoutSkeleton";

export default function CheckoutPage() {
  return (
    <div className="pb-24 pt-24 md:pt-28">
      <Container className="mb-8">
        <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/cart" className="transition-colors hover:text-primary">Cart</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">Checkout</span>
        </nav>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">Checkout</h1>
      </Container>
      <Container>
        <Suspense fallback={<CheckoutSkeleton />}>
          <CheckoutForm />
        </Suspense>
      </Container>
    </div>
  );
}
