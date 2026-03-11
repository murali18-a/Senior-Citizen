import { motion } from 'framer-motion'

export default function Card({
  children, className = '', hover = true, padding = 'p-6',
  header, footer, onClick, ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={hover ? { y: -2, boxShadow: '0 4px 25px -5px rgba(13, 148, 136, 0.15)' } : {}}
      className={`
        bg-white dark:bg-dark-card rounded-2xl shadow-soft 
        border border-gray-100 dark:border-dark-border
        overflow-hidden ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {header && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-border">
          {header}
        </div>
      )}
      <div className={padding}>{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-surface">
          {footer}
        </div>
      )}
    </motion.div>
  )
}
