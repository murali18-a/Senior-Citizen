import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pill, Clock, Check, SkipForward, AlertTriangle, Package } from 'lucide-react'
import { formatTime, getMedicineTimeSlot } from '../../utils/constants'
import Button from '../common/Button'

const timeSlotColors = {
  morning: 'from-amber-400 to-orange-400',
  afternoon: 'from-blue-400 to-cyan-400',
  night: 'from-indigo-400 to-purple-400',
  'as-needed': 'from-gray-400 to-gray-500',
}

const timeSlotBg = {
  morning: 'bg-amber-50 dark:bg-amber-900/20',
  afternoon: 'bg-blue-50 dark:bg-blue-900/20',
  night: 'bg-indigo-50 dark:bg-indigo-900/20',
  'as-needed': 'bg-gray-50 dark:bg-gray-900/20',
}

export default function MedicineCard({ medicine, onTake, onSkip, showActions = true }) {
  const [taken, setTaken] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const timeSlot = getMedicineTimeSlot(medicine.times[0])
  const isTaken = medicine.takenToday?.includes(medicine.times[0]) || taken
  const isLowStock = medicine.remaining <= medicine.threshold

  const handleTake = () => {
    setTaken(true)
    setShowConfetti(true)
    onTake?.(medicine)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative bg-white dark:bg-dark-card rounded-2xl shadow-soft border overflow-hidden
        ${isTaken ? 'border-success-200 dark:border-success-800' : isLowStock ? 'border-secondary-200' : 'border-gray-100 dark:border-dark-border'}
      `}
    >
      {/* Time slot indicator */}
      <div className={`h-1.5 bg-gradient-to-r ${timeSlotColors[timeSlot]}`} />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${timeSlotBg[timeSlot]}`}>
              <Pill size={22} className={`${isTaken ? 'text-success-500' : 'text-charcoal-muted'}`} />
            </div>
            <div>
              <h3 className={`font-bold text-lg ${isTaken ? 'text-charcoal-muted line-through' : 'text-charcoal dark:text-white'}`}>
                {medicine.name}
              </h3>
              <p className="text-sm text-charcoal-muted dark:text-gray-400">{medicine.dosage} • {medicine.frequency}</p>
            </div>
          </div>

          {isTaken && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
              className="w-8 h-8 rounded-full bg-success-500 flex items-center justify-center"
            >
              <Check size={16} className="text-white" />
            </motion.div>
          )}
        </div>

        {/* Schedule */}
        <div className="flex items-center gap-4 text-sm text-charcoal-muted dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {medicine.times.map(t => formatTime(t)).join(', ')}
          </span>
          <span className="flex items-center gap-1.5">
            <Package size={14} />
            {medicine.remaining} left
            {isLowStock && <AlertTriangle size={14} className="text-secondary-500" />}
          </span>
        </div>

        {medicine.instructions && (
          <p className="text-sm text-charcoal-muted dark:text-gray-400 bg-gray-50 dark:bg-dark-surface rounded-lg px-3 py-2 mb-3">
            💡 {medicine.instructions}
          </p>
        )}

        {/* Actions */}
        {showActions && !isTaken && (
          <div className="flex gap-2 mt-2">
            <Button variant="success" size="sm" icon={Check} onClick={handleTake} className="flex-1">
              Take Now
            </Button>
            <Button variant="ghost" size="sm" icon={SkipForward} onClick={() => onSkip?.(medicine)}>
              Skip
            </Button>
          </div>
        )}
      </div>

      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
          >
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{
                  x: Math.cos(i * 30 * Math.PI / 180) * 80,
                  y: Math.sin(i * 30 * Math.PI / 180) * 80 - 30,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`absolute w-2 h-2 rounded-full ${['bg-success-400', 'bg-primary-400', 'bg-secondary-400', 'bg-purple-400'][i % 4]
                  }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
