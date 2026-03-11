import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import seniorReducer from './seniorSlice'
import caregiverReducer from './caregiverSlice'
import providerReducer from './providerSlice'
import adminReducer from './adminSlice'
import notificationReducer from './notificationSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    senior: seniorReducer,
    caregiver: caregiverReducer,
    provider: providerReducer,
    admin: adminReducer,
    notifications: notificationReducer,
    ui: uiReducer,
  },
})
