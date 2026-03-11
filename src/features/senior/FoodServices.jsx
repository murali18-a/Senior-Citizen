import { useState } from 'react'
import { motion } from 'framer-motion'
import { UtensilsCrossed, Star, Clock, Search, Filter } from 'lucide-react'
import Card from '../../components/common/Card'
import SearchBar from '../../components/common/SearchBar'
import MealCard from '../../components/domain/MealCard'
import StatusBadge from '../../components/common/StatusBadge'
import { mockFoodProviders, mockMeals, mockMealPlan, mockMenuItems } from '../../utils/mockData'
import { toast } from 'sonner'

const dietaryFilters = ['diabetic-friendly', 'low-sodium', 'heart-healthy', 'vegetarian', 'soft-foods', 'gluten-free']
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function FoodServices() {
  const [activeTab, setActiveTab] = useState('browse')
  const [activeFilters, setActiveFilters] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'browse', label: 'Browse Providers' },
    { id: 'orders', label: 'My Orders' },
    { id: 'plan', label: 'Meal Plan' },
  ]

  const filteredItems = mockMenuItems.filter(item => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (activeFilters.length > 0) return activeFilters.some(f => item.dietaryTags.includes(f))
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal dark:text-white font-heading">Food Services</h1>
        <p className="text-charcoal-muted dark:text-gray-400">Browse meals, manage orders, and view your meal plan.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-dark-border">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 font-semibold text-sm border-b-2 transition-all touch-target ${activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-charcoal-muted hover:text-charcoal'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'browse' && (
        <div className="space-y-6">
          <SearchBar placeholder="Search meals..." onSearch={setSearchQuery} filters={dietaryFilters}
            activeFilters={activeFilters} onFilterChange={setActiveFilters} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <MealCard key={item.id} meal={item} onOrder={() => toast.success(`Ordered: ${item.name}`)} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {mockMeals.map(meal => (
            <Card key={meal.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-charcoal dark:text-white">{meal.meal}</h3>
                  <p className="text-sm text-charcoal-muted dark:text-gray-400">{meal.provider}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <StatusBadge status={meal.status} />
                    {meal.eta && <span className="text-sm text-charcoal-muted flex items-center gap-1"><Clock size={14} />{meal.eta}</span>}
                  </div>
                </div>
                {meal.rating && (
                  <div className="flex items-center gap-1 text-secondary-500">
                    <Star size={18} className="fill-secondary-500" /> {meal.rating}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'plan' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border">
                  <th className="py-3 px-4 font-semibold text-charcoal dark:text-white">Day</th>
                  <th className="py-3 px-4 font-semibold text-charcoal dark:text-white">🌅 Breakfast</th>
                  <th className="py-3 px-4 font-semibold text-charcoal dark:text-white">☀️ Lunch</th>
                  <th className="py-3 px-4 font-semibold text-charcoal dark:text-white">🌙 Dinner</th>
                </tr>
              </thead>
              <tbody>
                {mockMealPlan.map(day => (
                  <tr key={day.day} className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface">
                    <td className="py-3 px-4 font-semibold text-charcoal dark:text-white">{day.day}</td>
                    <td className="py-3 px-4 text-charcoal-muted dark:text-gray-400">{day.breakfast}</td>
                    <td className="py-3 px-4 text-charcoal-muted dark:text-gray-400">{day.lunch}</td>
                    <td className="py-3 px-4 text-charcoal-muted dark:text-gray-400">{day.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
