import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-warm',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
  danger: 'bg-emergency-600 hover:bg-emergency-700 text-white shadow-emergency',
  ghost: 'bg-transparent hover:bg-gray-100 text-charcoal dark:text-gray-200 dark:hover:bg-dark-card',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-dark-card',
  senior: 'bg-primary-600 hover:bg-primary-700 text-white text-xl py-4 px-8 min-h-touch min-w-touch shadow-warm',
  success: 'bg-success-600 hover:bg-success-700 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-7 py-3.5 text-lg rounded-xl',
  xl: 'px-9 py-4 text-xl rounded-2xl min-h-touch',
}

const Button = forwardRef(({
  children, variant = 'primary', size = 'md', className = '',
  disabled = false, loading = false, icon: Icon, iconRight: IconRight,
  fullWidth = false, ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold
        transition-colors duration-200 touch-target
        focus-visible:outline-primary-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : Icon ? (
        <Icon size={size === 'sm' ? 16 : size === 'lg' || size === 'xl' ? 24 : 20} />
      ) : null}
      {children}
      {IconRight && <IconRight size={size === 'sm' ? 16 : 20} />}
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button
