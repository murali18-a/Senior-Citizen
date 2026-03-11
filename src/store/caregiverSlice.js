import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  assignedSeniors: [],
  alerts: [],
  tasks: [],
  stats: { totalSeniors: 0, pendingAlerts: 0, completedTasks: 0 },
  loading: false,
}

const caregiverSlice = createSlice({
  name: 'caregiver',
  initialState,
  reducers: {
    setAssignedSeniors: (state, action) => { state.assignedSeniors = action.payload },
    setAlerts: (state, action) => { state.alerts = action.payload },
    acknowledgeAlert: (state, action) => {
      const alert = state.alerts.find(a => a.id === action.payload)
      if (alert) alert.status = 'acknowledged'
    },
    setTasks: (state, action) => { state.tasks = action.payload },
    completeTask: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload)
      if (task) task.status = 'completed'
    },
    setStats: (state, action) => { state.stats = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
  },
})

export const {
  setAssignedSeniors, setAlerts, acknowledgeAlert,
  setTasks, completeTask, setStats, setLoading,
} = caregiverSlice.actions
export default caregiverSlice.reducer
