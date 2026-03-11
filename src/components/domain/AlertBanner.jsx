import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'

export default function AlertBanner({ alert, onDismiss, onAction }) {
  const [visible, setVisible] = useState(true)

  if (!visible || !alert) return null

  const priorityStyles = {
    critical: 'bg-emergency-600 text-white',
    high: 'bg-secondary-500 text-white',
    medium: 'bg-primary-600 text-white',
    low: 'bg-gray-200 text-charcoal',
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className={`rounded-xl overflow-hidden ${priorityStyles[alert.priority] || priorityStyles.medium}`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <AlertTriangle size={20} className={alert.priority === 'critical' ? 'animate-pulse' : ''} />
            <div>
              <p className="font-semibold text-sm">{alert.seniorName}: {alert.type}</p>
              <p className="text-sm opacity-90">{alert.message}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onAction && (
              <button onClick={() => onAction(alert)} className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-sm font-semibold transition-colors touch-target">
                Respond
              </button>
            )}
            <button onClick={() => { setVisible(false); onDismiss?.(alert) }} className="p-1 rounded-lg hover:bg-white/20 transition-colors" aria-label="Dismiss alert">
              <X size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
