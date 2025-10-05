export default function Loading() {
  return (
    <section className="min-h-screen">
      {/* Header Skeleton */}
      <div className="m-4 mt-16 flex items-center justify-between gap-4">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center justify-center gap-4">
          <div className="h-8 w-20 animate-pulse rounded border bg-gray-200" />
          <div className="h-8 w-20 animate-pulse rounded border bg-gray-200" />
        </div>
      </div>

      {/* Search Results Grid Skeleton */}
      <div className="flex flex-wrap items-center justify-center gap-4 px-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-48 flex-shrink-0 space-y-2">
            <div className="h-72 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Loading Indicator */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-color border-t-transparent" />
          <span className="text-sm">Searching...</span>
        </div>
      </div>
    </section>
  );
}
