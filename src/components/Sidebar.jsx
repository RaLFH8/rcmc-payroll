import { LayoutDashboard, Users, DollarSign, FileText, Settings, Bell, MessageSquare, LogOut } from 'lucide-react'

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'payroll', label: 'Payroll', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-spectro-sidebar border-r border-spectro-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-spectro-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center glow-primary">
            <span className="text-white text-xl font-bold">S</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Spectro</h1>
            <p className="text-xs text-gray-500">Payroll System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium tracking-tight ${
                isActive
                  ? 'gradient-primary text-white glow-primary'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} strokeWidth={2} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-spectro-border space-y-3">
        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <button className="flex-1 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
            <Bell size={18} />
          </button>
          <button className="flex-1 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
            <MessageSquare size={18} />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center glow-primary">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@spectro.com</p>
          </div>
          <LogOut size={16} className="text-gray-500" />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
