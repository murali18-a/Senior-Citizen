import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, Clock, Star, CheckCircle, XCircle, Filter } from 'lucide-react'
import Card from '../../components/common/Card'
import StatCard from '../../components/common/StatCard'
import Button from '../../components/common/Button'
import StatusBadge from '../../components/common/StatusBadge'
import SearchBar from '../../components/common/SearchBar'
import { mockServiceRequests, mockMenuItems } from '../../utils/mockData'
import { formatRelativeTime } from '../../utils/constants'
import { toast } from 'sonner'

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('requests')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal dark:text-white font-heading">Provider Dashboard</h1>
        <p className="text-charcoal-muted dark:text-gray-400">Manage service requests, deliveries, and your menu.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Package} label="Pending Requests" value={mockServiceRequests.filter(r => r.status === 'pending').length} color="secondary" />
        <StatCard icon={Truck} label="Active Deliveries" value={mockServiceRequests.filter(r => r.status === 'in-progress' || r.status === 'accepted').length} color="primary" />
        <StatCard icon={CheckCircle} label="Completed Today" value={12} color="success" />
        <StatCard icon={Star} label="Avg Rating" value="4.8" color="secondary" trend="up" trendValue="+0.2" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-dark-border">
        {[{ id: 'requests', label: 'Requests' }, { id: 'menu', label: 'Menu Management' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 font-semibold text-sm border-b-2 transition-all touch-target ${activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-charcoal-muted hover:text-charcoal'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'requests' && (
        <div className="space-y-4">
          {mockServiceRequests.map(req => (
            <Card key={req.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-lg ${req.type === 'food' ? '🍽️' : '💊'}`} />
                    <h3 className="font-bold text-charcoal dark:text-white">{req.seniorName}</h3>
                    <StatusBadge status={req.status} />
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-charcoal-muted capitalize">{req.type}</span>
                  </div>
                  <p className="text-sm text-charcoal-muted dark:text-gray-400 mb-1">{req.details}</p>
                  <p className="text-xs text-charcoal-muted dark:text-gray-500">{req.address}</p>
                  {req.specialInstructions && <p className="text-xs text-secondary-600 mt-1">📝 {req.specialInstructions}</p>}
                  <p className="text-xs text-charcoal-muted mt-2">{formatRelativeTime(req.requestedAt)}</p>
                </div>
                {req.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <Button variant="success" size="sm" icon={CheckCircle} onClick={() => toast.success('Request accepted!')}>Accept</Button>
                    <Button variant="ghost" size="sm" icon={XCircle} onClick={() => toast('Request declined')}>Decline</Button>
                  </div>
                )}
                {req.status === 'accepted' && (
                  <Button variant="primary" size="sm" icon={Truck} onClick={() => toast.success('Marked as in transit')}>Start Delivery</Button>
                )}
                {req.status === 'in-progress' && (
                  <Button variant="success" size="sm" icon={CheckCircle} onClick={() => toast.success('Delivered!')}>Mark Delivered</Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold text-charcoal dark:text-white">Your Menu Items</h2>
            <Button size="sm" onClick={() => toast('Add menu item modal')}>Add Item</Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockMenuItems.map(item => (
              <Card key={item.id}>
                <div className="h-32 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-3">
                  <span className="text-4xl">🍽️</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-charcoal dark:text-white">{item.name}</h3>
                  <span className="font-bold text-primary-600">${item.price}</span>
                </div>
                <p className="text-sm text-charcoal-muted dark:text-gray-400 mb-2">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.dietaryTags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary-700">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <StatusBadge status={item.available ? 'active' : 'inactive'} />
                  <button className="text-sm text-primary-600 font-semibold hover:text-primary-700">Edit</button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
