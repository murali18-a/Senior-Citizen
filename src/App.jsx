import { useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'

function App() {
  const { seniorMode, darkMode } = useSelector((state) => state.ui)

  return (
    <div className={`${seniorMode ? 'senior-mode' : ''} ${darkMode ? 'dark' : ''}`}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <AppRouter />
    </div>
  )
}

export default App
