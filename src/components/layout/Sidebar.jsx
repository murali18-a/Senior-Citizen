import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { logout } from '../../store/authSlice'
import { toggleSidebar, toggleSeniorMode, toggleDarkMode } from '../../store/uiSlice'
import {
  Home, UtensilsCrossed, Pill, AlertTriangle, User, Settings, Users,
  BarChart3, Shield, ClipboardList, ChevronLeft, ChevronRight, LogOut,
  Heart, Menu, Bell, Sun, Moon, Accessibility, Package, Star, Truck,
  FileText, Wrench, UserCheck, Activity
} from 'lucide-react'

const roleNavItems = {
  senior: [
    { path: '/senior', icon: Home, label: 'Dashboard', end: true },
    { path: '/senior/food', icon: UtensilsCrossed, label: 'Food Services' },
    { path: '/senior/medicine', icon: Pill, label: 'Medicines' },
    { path: '/senior/emergency', icon: AlertTriangle, label: 'Emergency' },
    { path: '/senior/profile', icon: User, label: 'Profile & Settings' },
  ],
  caregiver: [
    { path: '/caregiver', icon: Home, label: 'Dashboard', end: true },
    { path: '/caregiver/seniors', icon: Users, label: 'My Seniors' },
    { path: '/caregiver/alerts', icon: Bell, label: 'Alerts' },
    { path: '/caregiver/schedule', icon: ClipboardList, label: 'Schedule' },
    { path: '/caregiver/profile', icon: User, label: 'Profile' },
  ],
  provider: [
    { path: '/provider', icon: Home, label: 'Dashboard', end: true },
    { path: '/provider/requests', icon: ClipboardList, label: 'Requests' },
    { path: '/provider/menu', icon: UtensilsCrossed, label: 'Menu Management' },
    { path: '/provider/reviews', icon: Star, label: 'Reviews' },
    { path: '/provider/profile', icon: User, label: 'Profile' },
  ],
  admin: [
    { path: '/admin', icon: Home, label: 'Dashboard', end: true },
    { path: '/admin/users', icon: Users, label: 'User Management' },
    { path: '/admin/services', icon: Package, label: 'Services' },
    { path: '/admin/emergency', icon: AlertTriangle, label: 'Emergencies' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ],
}

export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sidebarOpen, seniorMode, darkMode } = useSelector(state => state.ui)
  const { role, user } = useSelector(state => state.auth)
  const navItems = roleNavItems[role] || roleNavItems.senior

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => dispatch(toggleSidebar())}
          />
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className={`
          fixed left-0 top-0 h-full z-50 flex flex-col
          bg-white dark:bg-dark-surface border-r border-gray-100 dark:border-dark-border
          transition-all duration-300 shadow-soft
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100 dark:border-dark-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center flex-shrink-0">
            <Heart className="text-white" size={22} />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="text-lg font-bold text-charcoal dark:text-white font-heading">ElderEase</h1>
                <p className="text-xs text-charcoal-muted dark:text-gray-500">Care Platform</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-xl font-medium
                transition-all duration-200 touch-target group
                ${isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shadow-sm'
                  : 'text-charcoal-muted dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card hover:text-charcoal dark:hover:text-gray-200'
                }
              `}
              onClick={() => window.innerWidth < 1024 && dispatch(toggleSidebar())}
            >
              <item.icon size={22} className="flex-shrink-0" />
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-base whitespace-nowrap">
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-gray-100 dark:border-dark-border space-y-1">
          {role === 'senior' && (
            <button
              onClick={() => dispatch(toggleSeniorMode())}
              className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl font-medium transition-all touch-target ${seniorMode ? 'bg-secondary-50 text-secondary-700' : 'text-charcoal-muted hover:bg-gray-50'
                }`}
            >
              <Accessibility size={22} />
              {sidebarOpen && <span>Senior Mode</span>}
            </button>
          )}
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl font-medium text-charcoal-muted dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card transition-all touch-target"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            {sidebarOpen && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl font-medium text-charcoal-muted dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-card transition-all touch-target"
          >
            {sidebarOpen ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl font-medium text-emergency-600 hover:bg-emergency-50 transition-all touch-target"
          >
            <LogOut size={22} />
            {sidebarOpen && <span>Log Out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  )
}
