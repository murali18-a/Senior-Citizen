export default function LoadingSkeleton({ type = 'card', count = 1, className = '' }) {
  const skeletons = {
    card: (
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-dark-border animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-dark-border rounded-xl" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-1/2" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-5/6" />
          <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-4/6" />
        </div>
      </div>
    ),
    stat: (
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-soft p-6 border border-gray-100 dark:border-dark-border animate-pulse">
        <div className="w-12 h-12 bg-gray-200 dark:bg-dark-border rounded-xl mb-4" />
        <div className="h-8 bg-gray-200 dark:bg-dark-border rounded w-1/3 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-2/3" />
      </div>
    ),
    row: (
      <div className="flex items-center gap-4 p-4 animate-pulse">
        <div className="w-10 h-10 bg-gray-200 dark:bg-dark-border rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-1/3 mb-2" />
          <div className="h-3 bg-gray-200 dark:bg-dark-border rounded w-1/2" />
        </div>
        <div className="h-6 w-16 bg-gray-200 dark:bg-dark-border rounded-full" />
      </div>
    ),
    text: (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-dark-border rounded w-4/6" />
      </div>
    ),
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{skeletons[type]}</div>
      ))}
    </div>
  )
}
