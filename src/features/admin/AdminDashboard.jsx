import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, AlertTriangle, Truck, Activity, UserCheck, Clock, BarChart3, Settings,
  ChevronDown, Check, X, Eye, Edit, Trash2, Download
} from 'lucide-react'
import Card from '../../components/common/Card'
import StatCard from '../../components/common/StatCard'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import SearchBar from '../../components/common/SearchBar'
import Modal from '../../components/common/Modal'
import { mockAllUsers, mockAnalytics, mockAlerts } from '../../utils/mockData'
import { formatDate, ROLE_LABELS } from '../../utils/constants'
import { toast } from 'sonner'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const PIE_COLORS = ['#0d9488', '#f59e0b', '#dc2626', '#8b5cf6']

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [userFilter, setUserFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'users', label: 'Users' },
    { id: 'services', label: 'Services' },
    { id: 'reports', label: 'Reports' },
  ]

  const filteredUsers = mockAllUsers.filter(u => {
    if (userFilter !== 'all' && u.role !== userFilter) return false
    if (searchQuery && !u.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal dark:text-white font-heading">Admin Panel</h1>
        <p className="text-charcoal-muted dark:text-gray-400">System overview and management tools.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-dark-border overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 font-semibold text-sm border-b-2 transition-all touch-target whitespace-nowrap ${activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-charcoal-muted hover:text-charcoal'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard icon={Users} label="Total Seniors" value={mockAnalytics.totalSeniors} color="primary" trend="up" trendValue="+12%" />
            <StatCard icon={UserCheck} label="Active Caregivers" value={mockAnalytics.activeCaregivers} color="blue" />
            <StatCard icon={Clock} label="Pending Requests" value={mockAnalytics.pendingRequests} color="secondary" />
            <StatCard icon={AlertTriangle} label="Open Emergencies" value={mockAnalytics.openEmergencies} color="emergency" />
            <StatCard icon={Truck} label="Today's Deliveries" value={mockAnalytics.todayDeliveries} color="success" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card header={<h3 className="font-bold text-charcoal dark:text-white font-heading">Registration Trends</h3>}>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockAnalytics.registrationTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="seniors" stroke="#0d9488" strokeWidth={2} name="Seniors" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="caregivers" stroke="#3b82f6" strokeWidth={2} name="Caregivers" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="providers" stroke="#f59e0b" strokeWidth={2} name="Providers" dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card header={<h3 className="font-bold text-charcoal dark:text-white font-heading">Service Distribution</h3>}>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={mockAnalytics.serviceDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                      paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {mockAnalytics.serviceDistribution.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card header={<h3 className="font-bold text-charcoal dark:text-white font-heading">Emergency Frequency</h3>}>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalytics.emergencyFrequency}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="medical" fill="#dc2626" name="Medical" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="fall" fill="#f59e0b" name="Fall" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="other" fill="#8b5cf6" name="Other" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card header={<h3 className="font-bold text-charcoal dark:text-white font-heading">Live Emergency Feed</h3>}>
              <div className="space-y-3">
                {mockAlerts.map(alert => (
                  <div key={alert.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-dark-border">
                    <AlertTriangle size={18} className={alert.priority === 'critical' ? 'text-emergency-500 animate-pulse' : 'text-secondary-500'} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-charcoal dark:text-white truncate">{alert.seniorName}: {alert.type}</p>
                      <p className="text-xs text-charcoal-muted dark:text-gray-400">{alert.message}</p>
                    </div>
                    <StatusBadge status={alert.status} />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {['all', 'senior', 'caregiver', 'provider', 'admin'].map(filter => (
                <button key={filter} onClick={() => setUserFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all touch-target ${userFilter === filter ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-dark-surface text-charcoal-muted hover:bg-gray-200'}`}>
                  {filter === 'all' ? 'All' : ROLE_LABELS[filter]}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" icon={Download} onClick={() => toast.success('Export started')}>Export</Button>
            </div>
          </div>

          <SearchBar placeholder="Search users..." onSearch={setSearchQuery} />

          <Card padding="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-surface">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal dark:text-gray-300">Name</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal dark:text-gray-300">Role</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal dark:text-gray-300">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal dark:text-gray-300">Joined</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-charcoal dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 flex items-center justify-center text-white text-sm font-bold">
                            {user.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-charcoal dark:text-white text-sm">{user.name}</p>
                            <p className="text-xs text-charcoal-muted dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm capitalize text-charcoal-muted dark:text-gray-400">{ROLE_LABELS[user.role]}</span>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                      <td className="px-6 py-4 text-sm text-charcoal-muted dark:text-gray-400">{formatDate(user.joinDate)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setSelectedUser(user)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors" aria-label="View user"><Eye size={16} /></button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors" aria-label="Edit user"><Edit size={16} /></button>
                          {user.status === 'pending' && (
                            <Button variant="success" size="sm" onClick={() => toast.success(`${user.name} approved!`)}>Approve</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Services */}
      {activeTab === 'services' && (
        <Card>
          <p className="text-charcoal-muted text-center py-12">Service management — master table with advanced filters and provider assignment coming soon.</p>
        </Card>
      )}

      {/* Reports */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'User Activity Report', desc: 'Login frequency, feature usage', icon: Activity },
              { title: 'Service Usage Report', desc: 'Food and medicine requests by type', icon: BarChart3 },
              { title: 'Emergency Response Report', desc: 'Response times and resolution rates', icon: AlertTriangle },
            ].map(report => (
              <Card key={report.title} hover>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                    <report.icon size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-charcoal dark:text-white">{report.title}</h3>
                    <p className="text-sm text-charcoal-muted dark:text-gray-400 mt-1">{report.desc}</p>
                    <Button variant="ghost" size="sm" className="mt-3" icon={Download} onClick={() => toast.success('Report exported!')}>Export CSV</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} title="User Details" size="md">
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold">
                {selectedUser.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-charcoal">{selectedUser.name}</h3>
                <p className="text-charcoal-muted">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-gray-50"><p className="text-xs text-charcoal-muted mb-1">Role</p><p className="font-semibold capitalize">{ROLE_LABELS[selectedUser.role]}</p></div>
              <div className="p-3 rounded-xl bg-gray-50"><p className="text-xs text-charcoal-muted mb-1">Status</p><StatusBadge status={selectedUser.status} /></div>
              <div className="p-3 rounded-xl bg-gray-50"><p className="text-xs text-charcoal-muted mb-1">Joined</p><p className="font-semibold">{formatDate(selectedUser.joinDate)}</p></div>
              <div className="p-3 rounded-xl bg-gray-50"><p className="text-xs text-charcoal-muted mb-1">ID</p><p className="font-semibold text-sm">{selectedUser.id}</p></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
