import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, User, Users as UsersIcon, Truck, ChevronRight, ChevronLeft, ArrowRight, Check } from 'lucide-react'
import Button from '../../components/common/Button'

const roles = [
  { id: 'senior', label: 'Senior Citizen', desc: 'I need care and assistance', icon: '👴', color: 'border-primary-500 bg-primary-50' },
  { id: 'caregiver', label: 'Caregiver', desc: 'I provide care for seniors', icon: '👩‍⚕️', color: 'border-blue-500 bg-blue-50' },
  { id: 'provider', label: 'Service Provider', desc: 'I deliver food or medicine', icon: '🏪', color: 'border-green-500 bg-green-50' },
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' })

  const totalSteps = 3

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Heart className="text-white" size={22} />
            </div>
            <span className="text-xl font-bold text-charcoal font-heading">ElderEase</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-charcoal font-heading mb-2">Create Account</h1>
          <p className="text-charcoal-muted mb-8">Join ElderEase in a few simple steps.</p>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`h-2 rounded-full flex-1 transition-all ${s <= step ? 'bg-primary-500' : 'bg-gray-200'}`} />
              </div>
            ))}
            <span className="text-xs text-charcoal-muted font-medium ml-2">{step}/{totalSteps}</span>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold text-charcoal mb-4 font-heading">Choose Your Role</h2>
                <div className="space-y-3">
                  {roles.map(role => (
                    <button key={role.id} onClick={() => { setSelectedRole(role.id); setStep(2) }}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left touch-target ${selectedRole === role.id ? role.color : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}>
                      <span className="text-4xl">{role.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold text-charcoal text-lg">{role.label}</p>
                        <p className="text-sm text-charcoal-muted">{role.desc}</p>
                      </div>
                      <ChevronRight className="text-charcoal-muted" size={20} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold text-charcoal mb-4 font-heading">Personal Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Full Name</label>
                    <input name="name" value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base touch-target"
                      placeholder="Enter your full name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base touch-target"
                      placeholder="Enter your email" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Phone</label>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base touch-target"
                      placeholder="Enter your phone number" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal mb-2">Password</label>
                    <input name="password" type="password" value={formData.password} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base touch-target"
                      placeholder="Create a password" required />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button variant="ghost" type="button" icon={ChevronLeft} onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit" fullWidth icon={ArrowRight}>Continue</Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center py-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300 }}
                    className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
                    <Check className="text-success-600" size={40} />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-charcoal font-heading mb-2">Account Created!</h2>
                  <p className="text-charcoal-muted mb-8">Welcome to ElderEase. You can now sign in to your account.</p>
                  <Button size="lg" fullWidth onClick={() => navigate('/login')}>Go to Login</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-charcoal-muted mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold">Sign In</Link>
          </p>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 to-teal-600 items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <span className="text-7xl mb-6 block">✨</span>
          <h2 className="text-3xl font-bold mb-4 font-heading">Join Our Community</h2>
          <p className="text-primary-100 text-lg">Be part of a growing network dedicated to making senior care accessible, reliable, and full of warmth.</p>
        </div>
      </div>
    </div>
  )
}
