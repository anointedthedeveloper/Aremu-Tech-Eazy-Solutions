export default function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`skeleton rounded-lg ${className}`} />
}

/** Shown while a lazily loaded page is downloading. */
export function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading page" className="pt-28 pb-16 sm:pt-32">
      <span className="sr-only">Loading…</span>
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <Skeleton className="h-3.5 w-28" />
        <Skeleton className="mt-5 h-10 w-full max-w-xl sm:h-14" />
        <Skeleton className="mt-3 h-10 w-3/4 max-w-md sm:h-14" />
        <Skeleton className="mt-6 h-4 w-full max-w-lg" />
        <Skeleton className="mt-2 h-4 w-2/3 max-w-md" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
              <Skeleton className="mt-4 h-4 w-1/3" />
              <Skeleton className="mt-2 h-5 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
