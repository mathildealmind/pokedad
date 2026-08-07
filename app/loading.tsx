export default function Loading() {
  return (
    <main className="mx-auto min-h-[50vh] max-w-7xl px-6 py-16">
      <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
      <div className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[3/4] animate-pulse rounded-xl bg-gray-200"
          />
        ))}
      </div>
    </main>
  );
}
