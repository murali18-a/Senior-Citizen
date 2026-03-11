import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profile: null,
  medicines: [],
  meals: [],
  mealPlans: [],
  emergencies: [],
  foodProviders: [],
  assignedCaregiver: null,
  activityFeed: [],
  loading: false,
}

const seniorSlice = createSlice({
  name: 'senior',
  initialState,
  reducers: {
    setProfile: (state, action) => { state.profile = action.payload },
    setMedicines: (state, action) => { state.medicines = action.payload },
    addMedicine: (state, action) => { state.medicines.push(action.payload) },
    updateMedicine: (state, action) => {
      const idx = state.medicines.findIndex(m => m.id === action.payload.id)
      if (idx !== -1) state.medicines[idx] = { ...state.medicines[idx], ...action.payload }
    },
    markMedicineTaken: (state, action) => {
      const med = state.medicines.find(m => m.id === action.payload.id)
      if (med) {
        if (!med.takenToday) med.takenToday = []
        med.takenToday.push(action.payload.time)
      }
    },
    setMeals: (state, action) => { state.meals = action.payload },
    setMealPlans: (state, action) => { state.mealPlans = action.payload },
    addMealOrder: (state, action) => { state.meals.push(action.payload) },
    updateMealStatus: (state, action) => {
      const meal = state.meals.find(m => m.id === action.payload.id)
      if (meal) meal.status = action.payload.status
    },
    setEmergencies: (state, action) => { state.emergencies = action.payload },
    addEmergency: (state, action) => { state.emergencies.unshift(action.payload) },
    setFoodProviders: (state, action) => { state.foodProviders = action.payload },
    setAssignedCaregiver: (state, action) => { state.assignedCaregiver = action.payload },
    setActivityFeed: (state, action) => { state.activityFeed = action.payload },
    setLoading: (state, action) => { state.loading = action.payload },
  },
})

export const {
  setProfile, setMedicines, addMedicine, updateMedicine, markMedicineTaken,
  setMeals, setMealPlans, addMealOrder, updateMealStatus,
  setEmergencies, addEmergency, setFoodProviders, setAssignedCaregiver,
  setActivityFeed, setLoading,
} = seniorSlice.actions
export default seniorSlice.reducer
