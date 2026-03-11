import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Sun, CloudSun, Moon, Pill, UtensilsCrossed, Activity, CheckCircle, Clock } from 'lucide-react'
import Card from '../../components/common/Card'
import StatusBadge from '../../components/common/StatusBadge'
import SOSButton from '../../components/domain/SOSButton'
import MedicineCard from '../../components/domain/MedicineCard'
import { mockMedicines, mockMeals, mockActivityFeed, mockUsers } from '../../utils/mockData'
import { getTimeOfDay, formatTime, formatRelativeTime } from '../../utils/constants'

export default function SeniorDashboard() {
  const { user } = useSelector(state => state.auth)
  const name = user?.name || mockUsers.senior.name
  const greeting = getTimeOfDay()
  const greetIcon = greeting === 'Morning' ? <Sun className="text-secondary-500" /> : greeting === 'Afternoon' ? <CloudSun className="text-secondary-500" /> : <Moon className="text-primary-500" />

  const upcomingMedicines = mockMedicines.filter(m => m.times[0] !== 'PRN' && !m.takenToday?.includes(m.times[0]))
  const nextMeal = mockMeals.find(m => m.status !== 'delivered')

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          {greetIcon}
          <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal dark:text-white font-heading">
            Good {greeting}, {name.split(' ')[0]}!
          </h1>
        </div>
        <p className="text-charcoal-muted dark:text-gray-400">Here's your day at a glance.</p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Medicines + Meals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Medicine Schedule */}
          <Card header={
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="text-primary-600" size={20} />
                <h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Today's Medicines</h2>
              </div>
              <span className="text-sm text-charcoal-muted">
                {mockMedicines.filter(m => m.takenToday?.length > 0).length}/{mockMedicines.filter(m => m.times[0] !== 'PRN').length} taken
              </span>
            </div>
          }>
            <div className="space-y-4">
              {mockMedicines.filter(m => m.times[0] !== 'PRN').map(med => (
                <MedicineCard key={med.id} medicine={med} />
              ))}
            </div>
          </Card>

          {/* Next Meal */}
          {nextMeal && (
            <Card header={
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="text-secondary-600" size={20} />
                <h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Next Meal</h2>
              </div>
            }>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-charcoal dark:text-white text-lg">{nextMeal.meal}</h3>
                  <p className="text-charcoal-muted dark:text-gray-400">{nextMeal.provider}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <StatusBadge status={nextMeal.status} />
                    {nextMeal.eta && (
                      <span className="flex items-center gap-1.5 text-sm text-charcoal-muted">
                        <Clock size={14} /> ETA: {nextMeal.eta}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-5xl">🍽️</div>
              </div>
              {/* Delivery progress */}
              <div className="mt-4 flex items-center gap-2">
                {['Preparing', 'On the way', 'Delivered'].map((step, i) => {
                  const statusMap = { preparing: 0, 'on-the-way': 1, delivered: 2 }
                  const current = statusMap[nextMeal.status] ?? 0
                  return (
                    <div key={step} className="flex-1 flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= current ? 'bg-primary-600 text-white' : 'bg-gray-200 text-charcoal-muted'
                        }`}>
                        {i < current ? <CheckCircle size={16} /> : i + 1}
                      </div>
                      <span className={`text-xs ${i <= current ? 'text-primary-600 font-semibold' : 'text-charcoal-muted'}`}>{step}</span>
                      {i < 2 && <div className={`flex-1 h-0.5 ${i < current ? 'bg-primary-500' : 'bg-gray-200'}`} />}
                    </div>
                  )
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: SOS + Caregiver + Activity */}
        <div className="space-y-6">
          {/* SOS Button */}
          <Card className="!bg-gradient-to-br from-emergency-50 to-orange-50 dark:from-emergency-900/20 dark:to-orange-900/20">
            <div className="flex flex-col items-center py-4">
              <SOSButton />
            </div>
          </Card>

          {/* Caregiver Status */}
          <Card header={
            <h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Your Caregiver</h2>
          }>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">ED</div>
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-success-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="font-bold text-charcoal dark:text-white">Nurse Emily Davis</p>
                <p className="text-sm text-charcoal-muted dark:text-gray-400">Geriatric Care Specialist</p>
                <StatusBadge status="online" className="mt-1" />
              </div>
            </div>
          </Card>

          {/* Activity Feed */}
          <Card header={
            <div className="flex items-center gap-2">
              <Activity className="text-primary-600" size={20} />
              <h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Recent Activity</h2>
            </div>
          }>
            <div className="space-y-4">
              {mockActivityFeed.map(activity => (
                <div key={activity.id} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-charcoal dark:text-gray-200">{activity.message}</p>
                    <p className="text-xs text-charcoal-muted dark:text-gray-500">{formatRelativeTime(activity.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
