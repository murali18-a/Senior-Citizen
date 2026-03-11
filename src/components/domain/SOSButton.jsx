import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Check, X, AlertTriangle } from 'lucide-react'

export default function SOSButton({ compact = false, onTrigger }) {
  const [holding, setHolding] = useState(false)
  const [progress, setProgress] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const intervalRef = useRef(null)
  const holdDuration = 3000 // 3 seconds

  const startHold = useCallback(() => {
    setHolding(true)
    setProgress(0)
    const startTime = Date.now()
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const p = Math.min((elapsed / holdDuration) * 100, 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(intervalRef.current)
        setHolding(false)
        setTriggered(true)
        onTrigger?.()
        // Auto-reset after 5s
        setTimeout(() => setTriggered(false), 5000)
      }
    }, 30)
  }, [onTrigger])

  const endHold = useCallback(() => {
    if (!triggered) {
      clearInterval(intervalRef.current)
      setHolding(false)
      setProgress(0)
    }
  }, [triggered])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  if (triggered) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={compact ? 'inline-flex' : 'flex flex-col items-center'}
      >
        <div className={`${compact ? 'w-12 h-12' : 'w-48 h-48'} rounded-full bg-success-500 flex items-center justify-center shadow-lg`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          >
            <Check className="text-white" size={compact ? 24 : 64} />
          </motion.div>
        </div>
        {!compact && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
            <p className="text-2xl font-bold text-success-700">Alert Sent!</p>
            <p className="text-charcoal-muted mt-1">Help is on the way. Stay calm.</p>
          </motion.div>
        )}
      </motion.div>
    )
  }

  if (compact) {
    return (
      <motion.button
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        whileHover={{ scale: 1.05 }}
        className="relative w-12 h-12 rounded-full bg-emergency-600 hover:bg-emergency-700 text-white shadow-emergency flex items-center justify-center touch-target overflow-hidden"
        aria-label="SOS Emergency Button — Hold for 3 seconds to activate"
      >
        {holding && (
          <motion.div
            className="absolute inset-0 bg-emergency-800 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: progress / 100 * 2 }}
            style={{ opacity: 0.5 }}
          />
        )}
        <AlertTriangle size={20} className="relative z-10" />
        {holding && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="22" fill="none" stroke="white" strokeWidth="3" strokeDasharray={`${progress * 1.38} 999`} opacity="0.8" />
          </svg>
        )}
      </motion.button>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <motion.button
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        animate={holding ? {} : { boxShadow: ['0 0 20px rgba(220,38,38,0.3)', '0 0 40px rgba(220,38,38,0.6)', '0 0 20px rgba(220,38,38,0.3)'] }}
        transition={holding ? {} : { duration: 2, repeat: Infinity }}
        className="relative w-48 h-48 rounded-full bg-gradient-to-br from-emergency-500 to-emergency-700 text-white shadow-emergency flex flex-col items-center justify-center touch-target cursor-pointer select-none overflow-hidden"
        aria-label="SOS Emergency Button — Hold for 3 seconds to activate"
        role="button"
      >
        {/* Ripple rings */}
        {!holding && (
          <>
            <span className="absolute inset-0 rounded-full border-4 border-emergency-400 animate-ripple" />
            <span className="absolute inset-0 rounded-full border-4 border-emergency-400 animate-ripple" style={{ animationDelay: '0.5s' }} />
            <span className="absolute inset-0 rounded-full border-4 border-emergency-400 animate-ripple" style={{ animationDelay: '1s' }} />
          </>
        )}

        {/* Progress circle */}
        {holding && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 z-10" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="6" />
            <circle cx="100" cy="100" r="95" fill="none" stroke="white" strokeWidth="6"
              strokeDasharray={`${progress * 5.97} 999`} strokeLinecap="round" />
          </svg>
        )}

        <AlertTriangle size={48} className="relative z-10 mb-2" />
        <span className="relative z-10 text-2xl font-bold">SOS</span>
        <span className="relative z-10 text-sm opacity-80">
          {holding ? `${Math.ceil((100 - progress) / 33.3)}s...` : 'Hold for 3s'}
        </span>
      </motion.button>
      <p className="mt-4 text-charcoal-muted dark:text-gray-400 text-center text-sm max-w-xs">
        Press and hold for 3 seconds to send an emergency alert to your caregiver and emergency contacts.
      </p>
    </div>
  )
}
