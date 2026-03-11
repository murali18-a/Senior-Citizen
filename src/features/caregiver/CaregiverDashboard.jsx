import { motion } from 'framer-motion'
import { Users, AlertTriangle, ClipboardList, Activity, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../../components/common/Card'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import AlertBanner from '../../components/domain/AlertBanner'
import { mockAssignedSeniors, mockAlerts, mockTasks } from '../../utils/mockData'
import { toast } from 'sonner'

export default function CaregiverDashboard() {
  const pendingAlerts = mockAlerts.filter(a => a.status === 'pending')
  const criticalAlert = pendingAlerts.find(a => a.priority === 'critical')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal dark:text-white font-heading">Caregiver Dashboard</h1>
        <p className="text-charcoal-muted dark:text-gray-400">Monitor your assigned seniors and manage tasks.</p>
      </div>

      {/* Critical alert */}
      {criticalAlert && <AlertBanner alert={criticalAlert} onAction={() => toast.success('Alert acknowledged!')} />}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Assigned Seniors" value={mockAssignedSeniors.length} color="primary" />
        <StatCard icon={AlertTriangle} label="Pending Alerts" value={pendingAlerts.length} color="emergency" trend={pendingAlerts.length > 0 ? 'up' : undefined} trendValue={pendingAlerts.length > 0 ? 'Needs attention' : ''} />
        <StatCard icon={ClipboardList} label="Tasks Today" value={mockTasks.filter(t => t.status === 'pending').length} color="secondary" />
        <StatCard icon={CheckCircle} label="Completed" value={mockTasks.filter(t => t.status === 'completed').length} color="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Seniors List */}
        <div className="lg:col-span-2">
          <Card header={
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">My Seniors</h2>
              <Link to="/caregiver/seniors" className="text-sm text-primary-600 font-semibold hover:text-primary-700">View All</Link>
            </div>
          }>
            <div className="space-y-3">
              {mockAssignedSeniors.map(senior => (
                <motion.div key={senior.id} whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-dark-surface hover:bg-gray-100 dark:hover:bg-dark-border transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white font-bold">
                        {senior.name.split(' ').map(w => w[0]).join('')}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${senior.status === 'online' ? 'bg-success-500' : 'bg-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-bold text-charcoal dark:text-white">{senior.name}</p>
                      <p className="text-sm text-charcoal-muted dark:text-gray-400">Age {senior.age} • {senior.conditions.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-charcoal dark:text-white">{senior.medicineCompliance}%</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${senior.medicineCompliance >= 80 ? 'bg-success-500' : senior.medicineCompliance >= 60 ? 'bg-secondary-500' : 'bg-emergency-500'}`} style={{ width: `${senior.medicineCompliance}%` }} />
                        </div>
                      </div>
                      <p className="text-xs text-charcoal-muted">{senior.lastActive}</p>
                    </div>
                    <StatusBadge status={senior.lastMealStatus.toLowerCase().replace(' ', '-')} />
                    <ChevronRight size={18} className="text-charcoal-muted" />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Tasks + Alerts */}
        <div className="space-y-6">
          <Card header={<h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Today's Tasks</h2>}>
            <div className="space-y-3">
              {mockTasks.map(task => (
                <div key={task.id} className={`p-3 rounded-xl border ${task.status === 'completed' ? 'border-success-200 bg-success-50/50' : 'border-gray-100 dark:border-dark-border'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className={`font-semibold text-sm ${task.status === 'completed' ? 'text-charcoal-muted line-through' : 'text-charcoal dark:text-white'}`}>{task.title}</p>
                    <StatusBadge status={task.priority} />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-charcoal-muted dark:text-gray-400">
                    <Clock size={12} /> {task.dueTime} • {task.senior}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card header={<h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Recent Alerts</h2>}>
            <div className="space-y-3">
              {mockAlerts.map(alert => (
                <div key={alert.id} className="p-3 rounded-xl border border-gray-100 dark:border-dark-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-charcoal dark:text-white">{alert.type}</span>
                    <StatusBadge status={alert.priority} />
                  </div>
                  <p className="text-xs text-charcoal-muted dark:text-gray-400">{alert.seniorName} — {alert.message}</p>
                  <StatusBadge status={alert.status} className="mt-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
