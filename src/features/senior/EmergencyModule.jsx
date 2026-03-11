import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Phone, MapPin, User } from 'lucide-react'
import Card from '../../components/common/Card'
import StatusBadge from '../../components/common/StatusBadge'
import SOSButton from '../../components/domain/SOSButton'
import { mockEmergencies, mockUsers } from '../../utils/mockData'
import { formatDateTime } from '../../utils/constants'
import { toast } from 'sonner'

export default function EmergencyModule() {
  const [sosTriggered, setSosTriggered] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal dark:text-white font-heading">Emergency</h1>
        <p className="text-charcoal-muted dark:text-gray-400">Quick access to emergency services and your SOS history.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* SOS Section */}
        <Card className="!bg-gradient-to-br from-emergency-50 to-orange-50 dark:from-emergency-900/20 dark:to-orange-900/20">
          <div className="flex flex-col items-center py-8">
            <SOSButton onTrigger={() => {
              setSosTriggered(true)
              toast.success('Emergency alert sent to all contacts!')
            }} />
          </div>
        </Card>

        {/* Emergency Contacts */}
        <Card header={<h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Emergency Contacts</h2>}>
          <div className="space-y-4">
            {mockUsers.senior.emergencyContacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-dark-surface">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <User size={18} className="text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal dark:text-white">{contact.name}</p>
                    <p className="text-sm text-charcoal-muted dark:text-gray-400">{contact.relation}</p>
                  </div>
                </div>
                <a href={`tel:${contact.phone}`} className="p-2.5 rounded-xl bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors touch-target">
                  <Phone size={18} />
                </a>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Emergency History */}
      <Card header={
        <div className="flex items-center gap-2">
          <Clock className="text-charcoal-muted" size={20} />
          <h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Emergency History</h2>
        </div>
      }>
        <div className="space-y-4">
          {mockEmergencies.map(emergency => (
            <div key={emergency.id} className="p-4 rounded-xl border border-gray-100 dark:border-dark-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={18} className="text-emergency-500" />
                  <span className="font-semibold text-charcoal dark:text-white">{emergency.type}</span>
                </div>
                <StatusBadge status={emergency.status} />
              </div>
              <p className="text-sm text-charcoal-muted dark:text-gray-400 mb-1">{emergency.notes}</p>
              <div className="flex items-center gap-4 text-xs text-charcoal-muted dark:text-gray-500">
                <span>Triggered: {formatDateTime(emergency.triggeredAt)}</span>
                <span>Resolved: {formatDateTime(emergency.resolvedAt)}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-charcoal-muted">Responders:</span>
                {emergency.responders.map((r, i) => (
                  <span key={i} className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full">{r}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
