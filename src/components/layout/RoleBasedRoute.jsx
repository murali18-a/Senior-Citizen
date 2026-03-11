import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function RoleBasedRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useSelector(state => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to the user's own dashboard
    const dashboardPaths = {
      senior: '/senior',
      caregiver: '/caregiver',
      provider: '/provider',
      admin: '/admin',
    }
    return <Navigate to={dashboardPaths[role] || '/login'} replace />
  }

  return <Outlet />
}
