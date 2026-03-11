import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Layouts
import AppShell from '../components/layout/AppShell'
import RoleBasedRoute from '../components/layout/RoleBasedRoute'

// Auth Pages
import LandingPage from '../features/auth/LandingPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'

// Senior Pages
import SeniorDashboard from '../features/senior/SeniorDashboard'
import FoodServices from '../features/senior/FoodServices'
import MedicineManagement from '../features/senior/MedicineManagement'
import EmergencyModule from '../features/senior/EmergencyModule'
import SeniorProfile from '../features/senior/SeniorProfile'

// Caregiver Pages
import CaregiverDashboard from '../features/caregiver/CaregiverDashboard'

// Provider Pages
import ProviderDashboard from '../features/provider/ProviderDashboard'

// Admin Pages
import AdminDashboard from '../features/admin/AdminDashboard'

export default function AppRouter() {
  const { isAuthenticated, role } = useSelector(state => state.auth)

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to={`/${role}`} replace /> : <LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to={`/${role}`} replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to={`/${role}`} replace /> : <RegisterPage />} />

      {/* Senior Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['senior']} />}>
        <Route element={<AppShell />}>
          <Route path="/senior" element={<SeniorDashboard />} />
          <Route path="/senior/food" element={<FoodServices />} />
          <Route path="/senior/medicine" element={<MedicineManagement />} />
          <Route path="/senior/emergency" element={<EmergencyModule />} />
          <Route path="/senior/profile" element={<SeniorProfile />} />
        </Route>
      </Route>

      {/* Caregiver Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['caregiver']} />}>
        <Route element={<AppShell />}>
          <Route path="/caregiver" element={<CaregiverDashboard />} />
          <Route path="/caregiver/seniors" element={<CaregiverDashboard />} />
          <Route path="/caregiver/alerts" element={<CaregiverDashboard />} />
          <Route path="/caregiver/schedule" element={<CaregiverDashboard />} />
          <Route path="/caregiver/profile" element={<CaregiverDashboard />} />
        </Route>
      </Route>

      {/* Provider Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['provider']} />}>
        <Route element={<AppShell />}>
          <Route path="/provider" element={<ProviderDashboard />} />
          <Route path="/provider/requests" element={<ProviderDashboard />} />
          <Route path="/provider/menu" element={<ProviderDashboard />} />
          <Route path="/provider/reviews" element={<ProviderDashboard />} />
          <Route path="/provider/profile" element={<ProviderDashboard />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
        <Route element={<AppShell />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<AdminDashboard />} />
          <Route path="/admin/emergency" element={<AdminDashboard />} />
          <Route path="/admin/reports" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
