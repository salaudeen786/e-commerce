"use client";

import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-muted",
        className
      )}
    />
  );
}

function CartRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-border py-4">
      <Skeleton className="h-20 w-20 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-8 w-24 rounded-lg" />
      <Skeleton className="h-5 w-16" />
      <Skeleton className="h-5 w-16" />
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="space-y-2">
      <div className="hidden items-center gap-4 border-b border-border pb-3 md:flex">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="ml-auto h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-10" />
      </div>
      {Array.from({ length: 3 }).map((_, i) => (
        <CartRowSkeleton key={i} />
      ))}
    </div>
  );
}
