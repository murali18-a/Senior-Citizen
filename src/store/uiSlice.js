import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  seniorMode: localStorage.getItem('elderease_seniorMode') === 'true',
  darkMode: localStorage.getItem('elderease_darkMode') === 'true',
  fontSize: parseInt(localStorage.getItem('elderease_fontSize') || '18'),
  sidebarOpen: true,
  activeModal: null,
  language: localStorage.getItem('elderease_language') || 'en',
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSeniorMode: (state) => {
      state.seniorMode = !state.seniorMode
      localStorage.setItem('elderease_seniorMode', state.seniorMode)
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('elderease_darkMode', state.darkMode)
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload
      localStorage.setItem('elderease_fontSize', action.payload)
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    openModal: (state, action) => {
      state.activeModal = action.payload
    },
    closeModal: (state) => {
      state.activeModal = null
    },
    setLanguage: (state, action) => {
      state.language = action.payload
      localStorage.setItem('elderease_language', action.payload)
    },
  },
})

export const {
  toggleSeniorMode, toggleDarkMode, setFontSize,
  toggleSidebar, setSidebarOpen, openModal, closeModal, setLanguage,
} = uiSlice.actions
export default uiSlice.reducer
