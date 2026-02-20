import { useState } from 'react'
import { Building2, Mail, Phone, MapPin, Save, Info, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  
  const [companyInfo, setCompanyInfo] = useState({
    name: 'RIZALCARE MEDICAL CLINIC',
    address: 'GF IPDL8 Bldg., 25 G. Dikit St., Brgy. Bagumbayan, Pililla, Rizal',
    phone1: '0938-775-1504',
    phone2: '0976-273-9445',
    email: 'rizalcaremedicalclinic@gmail.com'
  })

  const [deductionRates, setDeductionRates] = useState({
    sssRate: 7.5,
    sssEmployerRate: 7.5,
    philhealthNote: 'Manually set per employee',
    pagibigNote: 'Manually set per employee'
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to database
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo))
    localStorage.setItem('deductionRates', JSON.stringify(deductionRates))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Settings
          </h1>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
            Manage system configuration and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'gradient-primary text-white glow-primary hover:opacity-90'
          }`}
        >
          <Save size={18} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Theme Toggle */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-spectro-purple/20 rounded-lg flex items-center justify-center">
              {theme === 'dark' ? (
                <Moon size={20} className="text-spectro-purple" />
              ) : (
                <Sun size={20} className="text-spectro-purple" />
              )}
            </div>
            <div>
              <h2 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Appearance
              </h2>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                Current theme: <span className="font-semibold">{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-3 px-6 py-3 border rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-white/5 hover:bg-white/10 border-spectro-border'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300'
            }`}
          >
            {theme === 'dark' ? (
              <>
                <Sun size={20} className="text-yellow-400" />
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Switch to Light
                </span>
              </>
            ) : (
              <>
                <Moon size={20} className="text-indigo-600" />
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Switch to Dark
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Company Information */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-spectro-purple/20 rounded-lg flex items-center justify-center">
            <Building2 size={20} className="text-spectro-purple" />
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Company Information
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}`}>
              Company Name
            </label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-spectro-purple ${
                theme === 'dark'
                  ? 'bg-white/5 border-spectro-border text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}`}>
              Address
            </label>
            <input
              type="text"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-spectro-purple ${
                theme === 'dark'
                  ? 'bg-white/5 border-spectro-border text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}`}>
                Phone 1
              </label>
              <input
                type="text"
                value={companyInfo.phone1}
                onChange={(e) => setCompanyInfo({...companyInfo, phone1: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-spectro-purple ${
                  theme === 'dark'
                    ? 'bg-white/5 border-spectro-border text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}`}>
                Phone 2
              </label>
              <input
                type="text"
                value={companyInfo.phone2}
                onChange={(e) => setCompanyInfo({...companyInfo, phone2: e.target.value})}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-spectro-purple ${
                  theme === 'dark'
                    ? 'bg-white/5 border-spectro-border text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}`}>
              Email
            </label>
            <input
              type="email"
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-spectro-purple ${
                theme === 'dark'
                  ? 'bg-white/5 border-spectro-border text-white'
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Deduction Settings */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-spectro-teal/20 rounded-lg flex items-center justify-center">
            <Info size={20} className="text-spectro-teal" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Deduction Configuration</h2>
        </div>

        <div className="space-y-6">
          {/* SSS */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">SSS (Social Security System)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Employee Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={deductionRates.sssRate}
                  onChange={(e) => setDeductionRates({...deductionRates, sssRate: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 bg-white/5 border border-spectro-border rounded-lg text-white focus:outline-none focus:border-spectro-purple"
                />
                <p className="text-xs text-gray-500 mt-1">Auto-calculated from salary</p>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Employer Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={deductionRates.sssEmployerRate}
                  onChange={(e) => setDeductionRates({...deductionRates, sssEmployerRate: parseFloat(e.target.value)})}
                  className="w-full px-4 py-3 bg-white/5 border border-spectro-border rounded-lg text-white focus:outline-none focus:border-spectro-purple"
                />
                <p className="text-xs text-gray-500 mt-1">For reference only</p>
              </div>
            </div>
            <div className="mt-3 p-3 bg-spectro-purple/10 border border-spectro-purple/20 rounded-lg">
              <p className="text-xs text-gray-300">
                <strong>Total SSS:</strong> 15% of salary (Employee: {deductionRates.sssRate}%, Employer: {deductionRates.sssEmployerRate}%)
              </p>
            </div>
          </div>

          {/* PhilHealth */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">PhilHealth</h3>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong>Configuration:</strong> {deductionRates.philhealthNote}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                PhilHealth contributions are set manually per employee in the employee management page.
              </p>
            </div>
          </div>

          {/* Pag-IBIG */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3">Pag-IBIG</h3>
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-gray-300">
                <strong>Configuration:</strong> {deductionRates.pagibigNote}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Pag-IBIG contributions are set manually per employee in the employee management page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white tracking-tight mb-6">System Information</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b border-spectro-border">
            <span className="text-gray-400">System Version</span>
            <span className="text-white font-semibold">1.0.0</span>
          </div>
          <div className="flex justify-between py-3 border-b border-spectro-border">
            <span className="text-gray-400">Database</span>
            <span className="text-white font-semibold">Supabase PostgreSQL</span>
          </div>
          <div className="flex justify-between py-3 border-b border-spectro-border">
            <span className="text-gray-400">Deployment</span>
            <span className="text-white font-semibold">Vercel</span>
          </div>
          <div className="flex justify-between py-3">
            <span className="text-gray-400">Last Updated</span>
            <span className="text-white font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white tracking-tight mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white/5 hover:bg-white/10 border border-spectro-border rounded-lg transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <Mail size={20} className="text-spectro-purple" />
              <span className="text-white font-semibold">Email Settings</span>
            </div>
            <p className="text-xs text-gray-400">Configure email notifications</p>
          </button>

          <button className="p-4 bg-white/5 hover:bg-white/10 border border-spectro-border rounded-lg transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <Phone size={20} className="text-spectro-teal" />
              <span className="text-white font-semibold">SMS Alerts</span>
            </div>
            <p className="text-xs text-gray-400">Setup SMS notifications</p>
          </button>

          <button className="p-4 bg-white/5 hover:bg-white/10 border border-spectro-border rounded-lg transition-colors text-left">
            <div className="flex items-center gap-3 mb-2">
              <MapPin size={20} className="text-pink-400" />
              <span className="text-white font-semibold">Backup Data</span>
            </div>
            <p className="text-xs text-gray-400">Export and backup records</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
