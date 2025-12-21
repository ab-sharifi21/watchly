export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative h-[70vh] w-full animate-pulse bg-gradient-to-b from-gray-200 to-gray-400 md:h-screen">
        <div className="absolute inset-0 bg-black/20" />

        {/* Movie Info Skeleton */}
        <div className="absolute bottom-8 left-4 max-w-lg space-y-4 md:left-8">
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-400" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-400" />
          <div className="space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-gray-400" />
            <div className="h-3 w-5/6 animate-pulse rounded bg-gray-400" />
            <div className="h-3 w-4/6 animate-pulse rounded bg-gray-400" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-16 animate-pulse rounded-full bg-gray-400" />
            <div className="h-8 w-20 animate-pulse rounded-full bg-gray-400" />
            <div className="w-18 h-8 animate-pulse rounded-full bg-gray-400" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-24 animate-pulse rounded bg-gray-400" />
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-400" />
          </div>
        </div>

        {/* Poster Skeleton */}
        <div className="absolute bottom-4 right-4 hidden h-[250px] w-[200px] animate-pulse rounded-lg bg-gray-300 md:right-8 md:block md:h-[270px] md:w-[210px]" />
      </section>

      {/* Actors Slider Section Skeleton */}
      <section className="px-4 py-8">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex-shrink-0 space-y-2">
              <div className="h-32 w-24 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>

      {/* Watch Providers Section Skeleton */}
      <section className="px-4 py-4">
        <div className="mb-3 h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="flex flex-wrap gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
