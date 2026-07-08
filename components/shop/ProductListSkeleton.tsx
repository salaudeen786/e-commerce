export function ProductListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-border bg-card p-4"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="aspect-square w-full shrink-0 rounded-xl bg-muted sm:w-48" />
            <div className="flex flex-1 flex-col gap-3">
              <div className="h-3 w-20 rounded-full bg-muted" />
              <div className="h-5 w-3/4 rounded-full bg-muted" />
              <div className="h-3 w-full rounded-full bg-muted" />
              <div className="h-3 w-2/3 rounded-full bg-muted" />
              <div className="mt-auto flex items-center justify-between">
                <div className="h-5 w-16 rounded-full bg-muted" />
                <div className="h-8 w-24 rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
