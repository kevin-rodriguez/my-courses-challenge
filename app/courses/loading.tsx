export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-2 h-6 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-900"
            >
              <div className="aspect-video w-full animate-pulse bg-gray-200 dark:bg-gray-800" />
              <div className="p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="mt-2 h-6 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

