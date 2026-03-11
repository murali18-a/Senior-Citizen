export default function StatusBadge({ status, className = '' }) {
  const colors = {
    active: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
    inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    pending: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400',
    delivered: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
    preparing: 'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400',
    'on-the-way': 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    'in-progress': 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    completed: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
    resolved: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
    acknowledged: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    emergency: 'bg-emergency-100 text-emergency-700 dark:bg-emergency-900/30 dark:text-emergency-400',
    critical: 'bg-emergency-100 text-emergency-700 dark:bg-emergency-900/30 dark:text-emergency-400 animate-pulse',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    medium: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    low: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    online: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
    offline: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    accepted: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
  }

  const label = status?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Unknown'

  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
      ${colors[status] || colors.inactive} ${className}
    `}>
      {(status === 'online' || status === 'active' || status === 'critical') && (
        <span className={`w-2 h-2 rounded-full mr-2 ${status === 'critical' ? 'bg-emergency-500 animate-pulse' :
            status === 'online' || status === 'active' ? 'bg-success-500' : 'bg-gray-400'
          }`} />
      )}
      {label}
    </span>
  )
}
