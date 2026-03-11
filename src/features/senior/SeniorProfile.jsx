import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { User, Phone, Heart, Shield, Bell, Eye, Sun, Moon, Type, Globe, Save } from 'lucide-react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { toggleSeniorMode, toggleDarkMode, setFontSize } from '../../store/uiSlice'
import { mockUsers } from '../../utils/mockData'
import { toast } from 'sonner'

export default function SeniorProfile() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { seniorMode, darkMode, fontSize } = useSelector(state => state.ui)
  const profile = user || mockUsers.senior

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-extrabold text-charcoal dark:text-white font-heading">Profile & Settings</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-2" header={<h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Personal Information</h2>}>
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">{profile.name?.split(' ').map(w => w[0]).join('')}</div>
              <div>
                <h3 className="text-xl font-bold text-charcoal dark:text-white">{profile.name}</h3>
                <p className="text-charcoal-muted dark:text-gray-400">{profile.email}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Phone', value: profile.phone, icon: Phone },
                { label: 'Address', value: profile.address, icon: User },
                { label: 'Blood Type', value: profile.bloodType, icon: Heart },
                { label: 'Age', value: profile.age, icon: User },
              ].map(field => (
                <div key={field.label} className="p-3 rounded-xl bg-gray-50 dark:bg-dark-surface">
                  <p className="text-xs text-charcoal-muted dark:text-gray-500 mb-1">{field.label}</p>
                  <p className="font-semibold text-charcoal dark:text-white">{field.value || 'Not set'}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal dark:text-white mb-2">Medical Conditions</p>
              <div className="flex flex-wrap gap-2">
                {(profile.medicalConditions || []).map(c => (
                  <span key={c} className="px-3 py-1 rounded-full bg-emergency-50 text-emergency-700 text-sm font-medium">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal dark:text-white mb-2">Allergies</p>
              <div className="flex flex-wrap gap-2">
                {(profile.allergies || []).map(a => (
                  <span key={a} className="px-3 py-1 rounded-full bg-secondary-50 text-secondary-700 text-sm font-medium">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <div className="space-y-6">
          <Card header={<h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Accessibility</h2>}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><Eye size={18} className="text-charcoal-muted" /><span className="font-medium">Senior Mode</span></div>
                <button onClick={() => dispatch(toggleSeniorMode())}
                  className={`w-12 h-7 rounded-full transition-colors ${seniorMode ? 'bg-primary-600' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${seniorMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">{darkMode ? <Moon size={18} /> : <Sun size={18} />}<span className="font-medium">Dark Mode</span></div>
                <button onClick={() => dispatch(toggleDarkMode())}
                  className={`w-12 h-7 rounded-full transition-colors ${darkMode ? 'bg-primary-600' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2"><Type size={18} className="text-charcoal-muted" /><span className="font-medium">Font Size: {fontSize}px</span></div>
                <input type="range" min="14" max="28" value={fontSize} onChange={e => dispatch(setFontSize(Number(e.target.value)))}
                  className="w-full accent-primary-600" />
              </div>
            </div>
          </Card>

          <Card header={<h2 className="text-lg font-bold text-charcoal dark:text-white font-heading">Emergency Contacts</h2>}>
            <div className="space-y-3">
              {(profile.emergencyContacts || mockUsers.senior.emergencyContacts).map((c, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-dark-surface">
                  <div>
                    <p className="font-semibold text-sm text-charcoal dark:text-white">{c.name}</p>
                    <p className="text-xs text-charcoal-muted">{c.relation}</p>
                  </div>
                  <a href={`tel:${c.phone}`} className="text-primary-600 text-sm font-medium">{c.phone}</a>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
