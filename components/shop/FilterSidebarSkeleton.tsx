export function FilterSidebarSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 h-5 w-16 rounded-full bg-muted" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="mb-4 border-b border-border pb-4">
          <div className="mb-2 h-4 w-24 rounded-full bg-muted" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-3 w-28 rounded-full bg-muted" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
