import { format, formatDistanceToNow, parseISO, isToday, isYesterday } from 'date-fns'

export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString
  return format(date, 'MMM dd, yyyy')
}

export const formatTime = (timeString) => {
  if (!timeString) return ''
  // Handle HH:mm format
  if (timeString.length <= 5) {
    const [h, m] = timeString.split(':')
    const hour = parseInt(h)
    const suffix = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    return `${displayHour}:${m} ${suffix}`
  }
  return format(parseISO(timeString), 'h:mm a')
}

export const formatDateTime = (dateString) => {
  if (!dateString) return ''
  const date = parseISO(dateString)
  return format(date, 'MMM dd, yyyy h:mm a')
}

export const formatRelativeTime = (dateString) => {
  if (!dateString) return ''
  const date = parseISO(dateString)
  if (isToday(date)) return `Today at ${format(date, 'h:mm a')}`
  if (isYesterday(date)) return `Yesterday at ${format(date, 'h:mm a')}`
  return formatDistanceToNow(date, { addSuffix: true })
}

export const getTimeOfDay = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Morning'
  if (hour < 17) return 'Afternoon'
  return 'Evening'
}

export const getMedicineTimeSlot = (time) => {
  if (time === 'PRN') return 'as-needed'
  const hour = parseInt(time.split(':')[0])
  if (hour < 12) return 'morning'
  if (hour < 17) return 'afternoon'
  return 'night'
}

export const ROLES = {
  SENIOR: 'senior',
  CAREGIVER: 'caregiver',
  PROVIDER: 'provider',
  ADMIN: 'admin',
}

export const ROLE_LABELS = {
  senior: 'Senior Citizen',
  caregiver: 'Caregiver',
  provider: 'Service Provider',
  admin: 'Administrator',
}

export const ROLE_COLORS = {
  senior: 'primary',
  caregiver: 'blue',
  provider: 'green',
  admin: 'purple',
}

export const STATUS_COLORS = {
  active: 'bg-success-100 text-success-700',
  inactive: 'bg-gray-100 text-gray-600',
  pending: 'bg-secondary-100 text-secondary-700',
  delivered: 'bg-success-100 text-success-700',
  preparing: 'bg-secondary-100 text-secondary-700',
  'on-the-way': 'bg-primary-100 text-primary-700',
  'in-progress': 'bg-primary-100 text-primary-700',
  completed: 'bg-success-100 text-success-700',
  resolved: 'bg-success-100 text-success-700',
  acknowledged: 'bg-primary-100 text-primary-700',
  emergency: 'bg-emergency-100 text-emergency-700',
  critical: 'bg-emergency-100 text-emergency-700',
  high: 'bg-secondary-100 text-secondary-700',
  medium: 'bg-primary-100 text-primary-700',
  low: 'bg-gray-100 text-gray-600',
}

export const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
