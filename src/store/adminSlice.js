import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  analytics: null,
  emergencies: [],
  systemConfig: {},
  approvalQueue: [],
  loading: false,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUsers: (state, action) => { state.users = action.payload },
    updateUserStatus: (state, action) => {
      const user = state.users.find(u => u.id === action.payload.id)
      if (user) user.status = action.payload.status
    },
    setAnalytics: (state, action) => { state.analytics = action.payload },
    setEmergencies: (state, action) => { state.emergencies = action.payload },
    setSystemConfig: (state, action) => { state.systemConfig = action.payload },
    setApprovalQueue: (state, action) => { state.approvalQueue = action.payload },
    approveUser: (state, action) => {
      state.approvalQueue = state.approvalQueue.filter(u => u.id !== action.payload)
      const user = state.users.find(u => u.id === action.payload)
      if (user) user.status = 'active'
    },
    setLoading: (state, action) => { state.loading = action.payload },
  },
})

export const {
  setUsers, updateUserStatus, setAnalytics, setEmergencies,
  setSystemConfig, setApprovalQueue, approveUser, setLoading,
} = adminSlice.actions
export default adminSlice.reducer
