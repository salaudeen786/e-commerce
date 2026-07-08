"use client";

import { cn } from "@/lib/utils";

function Pulse({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-muted", className)} />;
}

export function CheckoutSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <Pulse className="h-64" />
        <Pulse className="h-20" />
        <Pulse className="h-40" />
        <Pulse className="h-24" />
        <Pulse className="h-24" />
        <Pulse className="h-48" />
      </div>
      <div className="space-y-5">
        <Pulse className="h-80" />
        <Pulse className="h-20" />
        <Pulse className="h-16" />
        <Pulse className="h-14" />
      </div>
    </div>
  );
}
