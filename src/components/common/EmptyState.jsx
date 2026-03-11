import { motion } from 'framer-motion'
import { Inbox } from 'lucide-react'
import Button from './Button'

export default function EmptyState({
  icon: Icon = Inbox, title = 'No data found',
  description = 'There is nothing to show here yet.',
  actionLabel, onAction, className = ''
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-16 px-8 text-center ${className}`}
    >
      <div className="w-20 h-20 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-6">
        <Icon size={36} className="text-primary-400" />
      </div>
      <h3 className="text-xl font-bold text-charcoal dark:text-gray-200 mb-2 font-heading">{title}</h3>
      <p className="text-charcoal-muted dark:text-gray-400 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">{actionLabel}</Button>
      )}
    </motion.div>
  )
}
