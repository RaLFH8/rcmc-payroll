import { LayoutDashboard, Users, DollarSign, FileText, Settings, Bell, MessageSquare, LogOut, Menu, X, History } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Sidebar = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
  const { theme } = useTheme()
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'payslip-history', label: 'Payslip History', icon: History },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId)
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 h-16 border-b flex items-center justify-between px-4 z-30 ${
        theme === 'dark' 
          ? 'bg-spectro-sidebar border-spectro-border' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            theme === 'dark' ? 'gradient-primary glow-primary' : 'gradient-light'
          }`}>
            <span className="text-white text-xl font-bold">R</span>
          </div>
          <div>
            <h1 className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              RCMC
            </h1>
            <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
              Payroll System
            </p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-lg ${
            theme === 'dark'
              ? 'hover:bg-white/10 text-white'
              : 'hover:bg-slate-100 text-slate-900'
          }`}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 border-r flex flex-col z-30 transition-transform duration-300 ${
        theme === 'dark' 
          ? 'bg-spectro-sidebar border-spectro-border' 
          : 'bg-white border-slate-200'
      } ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Logo - Hidden on mobile (shown in header instead) */}
        <div className={`hidden lg:block p-6 border-b ${theme === 'dark' ? 'border-spectro-border' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'gradient-primary glow-primary' : 'gradient-light'
            }`}>
              <span className="text-white text-xl font-bold">R</span>
            </div>
            <div>
              <h1 className={`text-lg font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                RCMC
              </h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                Payroll System
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 mt-16 lg:mt-0">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handlePageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium tracking-tight ${
                  isActive
                    ? theme === 'dark'
                      ? 'gradient-primary text-white glow-primary'
                      : 'gradient-light text-white shadow-md'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Bottom Section */}
        <div className={`p-4 border-t space-y-3 ${theme === 'dark' ? 'border-spectro-border' : 'border-slate-200'}`}>
          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button className={`flex-1 h-10 rounded-lg flex items-center justify-center transition-all ${
              theme === 'dark'
                ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
            }`}>
              <Bell size={18} />
            </button>
            <button className={`flex-1 h-10 rounded-lg flex items-center justify-center transition-all ${
              theme === 'dark'
                ? 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
            }`}>
              <MessageSquare size={18} />
            </button>
          </div>

          {/* User Profile */}
          <div className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
            theme === 'dark'
              ? 'bg-white/5 hover:bg-white/10'
              : 'bg-slate-100 hover:bg-slate-200'
          }`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              theme === 'dark' ? 'gradient-primary glow-primary' : 'gradient-light'
            }`}>
              <span className="text-white font-semibold text-sm">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Admin User
              </p>
              <p className={`text-xs truncate ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                rizalcaremedicalclinic@gmail.com
              </p>
            </div>
            <LogOut size={16} className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'} />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
