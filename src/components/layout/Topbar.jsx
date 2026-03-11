import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Menu, Bell, Search, Phone } from 'lucide-react'
import { toggleSidebar } from '../../store/uiSlice'
import { markAllRead } from '../../store/notificationSlice'
import { mockNotifications } from '../../utils/mockData'
import { formatRelativeTime, getInitials } from '../../utils/constants'
import SOSButton from '../domain/SOSButton'

export default function Topbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, role } = useSelector(state => state.auth)
  const { sidebarOpen } = useSelector(state => state.ui)
  const { unreadCount } = useSelector(state => state.notifications)
  const [showNotif, setShowNotif] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl border-b border-gray-100 dark:border-dark-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card transition-colors touch-target lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* SOS for seniors */}
          {role === 'senior' && (
            <div className="hidden sm:block">
              <SOSButton compact />
            </div>
          )}

          {/* Emergency hotline */}
          <a href="tel:911" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-emergency-600 hover:bg-emergency-50 transition-colors text-sm font-semibold touch-target">
            <Phone size={18} />
            <span>911</span>
          </a>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-card transition-colors touch-target"
              aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            >
              <Bell size={22} className="text-charcoal-muted dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-emergency-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification dropdown */}
            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border overflow-hidden animate-slide-down">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-dark-border">
                  <h3 className="font-bold text-charcoal dark:text-white">Notifications</h3>
                  <button onClick={() => dispatch(markAllRead())} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {mockNotifications.map(n => (
                    <div key={n.id} className={`p-4 border-b border-gray-50 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-surface cursor-pointer transition-colors ${!n.read ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}>
                      <p className="text-sm font-semibold text-charcoal dark:text-gray-200">{n.title}</p>
                      <p className="text-sm text-charcoal-muted dark:text-gray-400 mt-0.5">{n.message}</p>
                      <p className="text-xs text-charcoal-muted dark:text-gray-500 mt-1">{formatRelativeTime(n.time)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User avatar */}
          <button
            onClick={() => navigate(`/${role}/profile`)}
            className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-charcoal dark:text-gray-200">{user?.name || 'User'}</p>
              <p className="text-xs text-charcoal-muted dark:text-gray-500 capitalize">{role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
              {getInitials(user?.name)}
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
