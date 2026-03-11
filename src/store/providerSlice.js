import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  requests: [],
  menu: [],
  deliveries: [],
  stats: { completed: 0, avgRating: 0, responseTime: 0 },
  loading: false,
}

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setRequests: (state, action) => { state.requests = action.payload },
    updateRequestStatus: (state, action) => {
      const req = state.requests.find(r => r.id === action.payload.id)
      if (req) req.status = action.payload.status
    },
    setMenu: (state, action) => { state.menu = action.payload },
    addMenuItem: (state, action) => { state.menu.push(action.payload) },
    updateMenuItem: (state, action) => {
      const idx = state.menu.findIndex(m => m.id === action.payload.id)
      if (idx !== -1) state.menu[idx] = { ...state.menu[idx], ...action.payload }
    },
    removeMenuItem: (state, action) => {
      state.menu = state.menu.filter(m => m.id !== action.payload)
    },
    setDeliveries: (state, action) => { state.deliveries = action.payload },
    setStats: (state, action) => { state.stats = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
  },
})

export const {
  setRequests, updateRequestStatus, setMenu, addMenuItem,
  updateMenuItem, removeMenuItem, setDeliveries, setStats, setLoading,
} = providerSlice.actions
export default providerSlice.reducer
