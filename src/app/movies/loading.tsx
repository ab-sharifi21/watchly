export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel Skeleton */}
      <div className="relative h-[60vh] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 md:h-screen">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-8 left-8 space-y-4">
          <div className="h-8 w-64 animate-pulse rounded bg-gray-400" />
          <div className="h-4 w-48 animate-pulse rounded bg-gray-400" />
          <div className="h-10 w-32 animate-pulse rounded bg-gray-400" />
        </div>
      </div>

      {/* Genres Menu Skeleton */}
      <div className="px-4 py-6">
        <div className="flex gap-3 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 flex-shrink-0 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* Sliders Skeleton - Matching movies page structure */}
      <div className="space-y-12 px-4">
        {/* Upcoming Movies Slider */}
        <div>
          <div className="mb-4 h-6 w-72 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-48 flex-shrink-0 space-y-2">
                <div className="h-72 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>

        {/* Best-rated Movies Slider (Horizontal Cards) */}
        <div>
          <div className="mb-4 h-6 w-80 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex w-80 flex-shrink-0 animate-pulse gap-4 rounded-lg bg-gray-100 p-4"
              >
                <div className="h-28 w-20 rounded bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-200" />
                  <div className="h-3 w-2/3 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Trending Movies Slider */}
        <div>
          <div className="mb-4 h-6 w-80 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-48 flex-shrink-0 space-y-2">
                <div className="h-72 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
