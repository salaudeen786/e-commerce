export function ProductGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-card">
          <div className="aspect-square rounded-2xl bg-muted" />
          <div className="space-y-2 px-3 pb-4 pt-3">
            <div className="h-3 w-20 rounded-full bg-muted" />
            <div className="h-4 w-3/4 rounded-full bg-muted" />
            <div className="h-3 w-1/2 rounded-full bg-muted" />
            <div className="h-5 w-16 rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
