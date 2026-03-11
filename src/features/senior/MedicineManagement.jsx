import { useState } from 'react'
import { motion } from 'framer-motion'
import { Pill, Plus, Calendar, BarChart3, AlertTriangle } from 'lucide-react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import MedicineCard from '../../components/domain/MedicineCard'
import { mockMedicines, mockComplianceHistory } from '../../utils/mockData'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { toast } from 'sonner'

export default function MedicineManagement() {
  const [activeTab, setActiveTab] = useState('list')
  const [showAddModal, setShowAddModal] = useState(false)

  const tabs = [
    { id: 'list', label: 'My Medicines', icon: Pill },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'compliance', label: 'Compliance', icon: BarChart3 },
  ]

  const lowStockMeds = mockMedicines.filter(m => m.remaining <= m.threshold)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal dark:text-white font-heading">Medicine Management</h1>
          <p className="text-charcoal-muted dark:text-gray-400">Track, manage, and never miss your medications.</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Medicine</Button>
      </div>

      {/* Low stock alert */}
      {lowStockMeds.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-secondary-600" size={20} />
            <span className="font-semibold text-secondary-700 dark:text-secondary-400">Low Stock Alert</span>
          </div>
          <p className="text-sm text-secondary-600 dark:text-secondary-400">
            {lowStockMeds.map(m => m.name).join(', ')} — running low. Consider requesting a refill.
          </p>
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-dark-border">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 transition-all touch-target ${activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-charcoal-muted hover:text-charcoal'}`}>
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'list' && (
        <div className="grid md:grid-cols-2 gap-4">
          {mockMedicines.map(med => (
            <MedicineCard key={med.id} medicine={med}
              onTake={(m) => toast.success(`${m.name} marked as taken! 🎉`)}
              onSkip={(m) => toast('Medicine skipped', { description: m.name })} />
          ))}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-6">
          {['Morning (6 AM - 12 PM)', 'Afternoon (12 PM - 6 PM)', 'Evening (6 PM - 12 AM)'].map((period, i) => {
            const slots = i === 0 ? ['08:00', '09:00'] : i === 1 ? ['12:00'] : ['20:00']
            const meds = mockMedicines.filter(m => slots.some(s => m.times.includes(s)))
            return (
              <Card key={period} header={
                <h3 className="font-bold text-charcoal dark:text-white font-heading">{['🌅', '☀️', '🌙'][i]} {period}</h3>
              }>
                {meds.length > 0 ? (
                  <div className="space-y-3">
                    {meds.map(med => (
                      <div key={med.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-dark-surface">
                        <div className="flex items-center gap-3">
                          <Pill size={18} className="text-primary-600" />
                          <div>
                            <span className="font-semibold text-charcoal dark:text-white">{med.name}</span>
                            <span className="text-sm text-charcoal-muted ml-2">{med.dosage}</span>
                          </div>
                        </div>
                        <span className="text-sm text-charcoal-muted">{med.times.filter(t => slots.includes(t)).join(', ')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-charcoal-muted text-center py-4">No medicines scheduled</p>
                )}
              </Card>
            )
          })}
        </div>
      )}

      {activeTab === 'compliance' && (
        <Card header={<h3 className="font-bold text-charcoal dark:text-white font-heading">Weekly Compliance</h3>}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockComplianceHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="taken" fill="#16a34a" name="Taken" radius={[4, 4, 0, 0]} />
                <Bar dataKey="missed" fill="#dc2626" name="Missed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="skipped" fill="#f59e0b" name="Skipped" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Add Medicine Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Medicine" size="md">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddModal(false); toast.success('Medicine added!') }}>
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Medicine Name</label>
            <input className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 text-base" placeholder="e.g. Metformin" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Dosage</label>
              <input className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 text-base" placeholder="e.g. 500mg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">Frequency</label>
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 text-base">
                <option>Once daily</option><option>Twice daily</option><option>Three times daily</option><option>As needed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-charcoal mb-2">Instructions</label>
            <textarea className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 text-base" rows="2" placeholder="e.g. Take with meals" />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" fullWidth>Add Medicine</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
