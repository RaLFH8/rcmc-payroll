import { useState } from 'react'
import { useTheme } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import Payroll from './pages/Payroll'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { theme } = useTheme()

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />
      case 'employees':
        return <Employees />
      case 'payroll':
        return <Payroll />
      case 'reports':
        return <Reports />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-spectro-bg' : 'bg-slate-50'}`}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 ml-64 p-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
