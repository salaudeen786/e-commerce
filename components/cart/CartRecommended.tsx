"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { products } from "@/mocks/mock-data";

export function CartRecommended() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cartItems = useCartStore((s) => s.items);

  const currentCategoryIds = new Set(cartItems.map((i) => i.product.category.id));
  const recommended = products
    .filter((p) => !cartItems.some((i) => i.product.id === p.id))
    .filter((p) => currentCategoryIds.has(p.category.id))
    .slice(0, 6);

  if (recommended.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">
          You May Also Like
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {recommended.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="w-44 shrink-0 rounded-xl border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-md"
          >
            <div className="relative mb-2 aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="176px"
              />
            </div>
            <p className="line-clamp-1 text-sm font-medium text-foreground">
              {product.name}
            </p>
            <p className="mt-0.5 text-sm font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
