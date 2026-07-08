"use client";

import { useWishlistStore } from "@/store/wishlist-store";
import { ProductCard } from "@/components/sections/ProductCard";
import { EmptyCart } from "@/components/cart/EmptyCart";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card">
          <EmptyCart />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
