import { motion } from 'framer-motion'
import { Star, Clock, ShoppingCart, Tag } from 'lucide-react'
import Button from '../common/Button'

export default function MealCard({ meal, onOrder, showOrder = true }) {
  const dietaryColors = {
    'diabetic-friendly': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'low-sodium': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    'heart-healthy': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'vegetarian': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'soft-foods': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'gluten-free': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-dark-card rounded-2xl shadow-soft border border-gray-100 dark:border-dark-border overflow-hidden"
    >
      {/* Image placeholder */}
      <div className="h-40 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
        <span className="text-5xl">🍽️</span>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-charcoal dark:text-white mb-1">{meal.name || meal.meal}</h3>

        {meal.provider && (
          <p className="text-sm text-charcoal-muted dark:text-gray-400 mb-2">by {meal.provider}</p>
        )}

        {meal.description && (
          <p className="text-sm text-charcoal-muted dark:text-gray-400 mb-3">{meal.description}</p>
        )}

        {/* Dietary tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(meal.dietaryTags || meal.dietaryOptions || []).map(tag => (
            <span key={tag} className={`text-xs font-medium px-2 py-1 rounded-full ${dietaryColors[tag] || 'bg-gray-100 text-gray-600'}`}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-charcoal-muted dark:text-gray-400">
            {meal.rating && (
              <span className="flex items-center gap-1">
                <Star size={14} className="text-secondary-500 fill-secondary-500" />
                {meal.rating}
              </span>
            )}
            {meal.deliveryTime && (
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {meal.deliveryTime}
              </span>
            )}
            {meal.price && (
              <span className="font-semibold text-charcoal dark:text-white">
                ${meal.price}
              </span>
            )}
          </div>
          {showOrder && (
            <Button variant="primary" size="sm" icon={ShoppingCart} onClick={() => onOrder?.(meal)}>
              Order
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
