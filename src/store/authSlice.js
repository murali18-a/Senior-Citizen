import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: localStorage.getItem('elderease_token') || null,
  role: localStorage.getItem('elderease_role') || null,
  isAuthenticated: !!localStorage.getItem('elderease_token'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.role = action.payload.user.role
      localStorage.setItem('elderease_token', action.payload.token)
      localStorage.setItem('elderease_role', action.payload.user.role)
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.role = null
      state.isAuthenticated = false
      localStorage.removeItem('elderease_token')
      localStorage.removeItem('elderease_role')
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, updateUser, clearError } = authSlice.actions
export default authSlice.reducer
