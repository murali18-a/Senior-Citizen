import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ icon: Icon, label, value, trend, trendValue, color = 'primary', className = '' }) {
  const colors = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    emergency: 'from-emergency-500 to-emergency-600',
    success: 'from-success-500 to-success-600',
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
  }

  const bgColors = {
    primary: 'bg-primary-50 dark:bg-primary-900/20',
    secondary: 'bg-secondary-50 dark:bg-secondary-900/20',
    emergency: 'bg-emergency-50 dark:bg-emergency-900/20',
    success: 'bg-success-50 dark:bg-success-900/20',
    purple: 'bg-purple-50 dark:bg-purple-900/20',
    blue: 'bg-blue-50 dark:bg-blue-900/20',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-white dark:bg-dark-card rounded-2xl shadow-soft p-6
        border border-gray-100 dark:border-dark-border
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colors[color]}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-success-600' : trend === 'down' ? 'text-emergency-600' : 'text-gray-500'
            }`}>
            {trend === 'up' ? <TrendingUp size={16} /> : trend === 'down' ? <TrendingDown size={16} /> : <Minus size={16} />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-charcoal dark:text-white font-heading">{value}</p>
        <p className="text-sm text-charcoal-muted dark:text-gray-400 mt-1">{label}</p>
      </div>
    </motion.div>
  )
}
