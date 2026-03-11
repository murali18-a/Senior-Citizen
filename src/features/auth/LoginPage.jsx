import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Heart, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react'
import { loginSuccess } from '../../store/authSlice'
import { setNotifications } from '../../store/notificationSlice'
import { mockUsers, mockNotifications } from '../../utils/mockData'
import Button from '../../components/common/Button'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const demoAccounts = [
    { role: 'senior', label: 'Senior Citizen', email: 'margaret@example.com', color: 'bg-primary-100 text-primary-700 border-primary-200' },
    { role: 'caregiver', label: 'Caregiver', email: 'emily.davis@example.com', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { role: 'provider', label: 'Provider', email: 'contact@sunrisemeals.com', color: 'bg-green-100 text-green-700 border-green-200' },
    { role: 'admin', label: 'Admin', email: 'admin@elderease.com', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  ]

  const handleLogin = (role) => {
    setLoading(true)
    setError('')
    setTimeout(() => {
      const user = mockUsers[role]
      dispatch(loginSuccess({ user, token: 'mock-jwt-token-' + role }))
      dispatch(setNotifications(mockNotifications))
      navigate(`/${role}`)
      setLoading(false)
    }, 800)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const role = demoAccounts.find(a => a.email === email)?.role
    if (role) {
      handleLogin(role)
    } else {
      setError('Invalid credentials. Try a demo account below.')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Heart className="text-white" size={22} />
            </div>
            <span className="text-xl font-bold text-charcoal font-heading">ElderEase</span>
          </Link>

          <h1 className="text-3xl font-extrabold text-charcoal font-heading mb-2">Welcome Back</h1>
          <p className="text-charcoal-muted mb-8">Sign in to continue to your dashboard.</p>

          {error && (
            <div className="bg-emergency-50 text-emergency-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2" htmlFor="email">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-muted" />
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base touch-target"
                  placeholder="Enter your email" required />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-charcoal" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-muted" />
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-base touch-target"
                  placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-muted hover:text-charcoal p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)}
                className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm text-charcoal-muted">Remember me for 30 days</span>
            </label>

            <Button type="submit" fullWidth size="lg" loading={loading} icon={ArrowRight}>Sign In</Button>
          </form>

          <p className="text-center text-charcoal-muted mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">Sign Up</Link>
          </p>

          {/* Demo accounts */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-charcoal-muted mb-3 text-center">Quick Demo Login</p>
            <div className="grid grid-cols-2 gap-2">
              {demoAccounts.map(acc => (
                <button key={acc.role} onClick={() => handleLogin(acc.role)}
                  className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all hover:shadow-sm touch-target ${acc.color}`}>
                  {acc.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-500 to-primary-700 items-center justify-center p-12">
        <div className="text-center text-white max-w-md">
          <span className="text-7xl mb-6 block">🤝</span>
          <h2 className="text-3xl font-bold mb-4 font-heading">Care Made Simple</h2>
          <p className="text-primary-100 text-lg leading-relaxed">
            Join a community where seniors receive the attention, nutrition, and medical care they deserve — every single day.
          </p>
        </div>
      </div>
    </div>
  )
}
