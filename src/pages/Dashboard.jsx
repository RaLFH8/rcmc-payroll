import { useEffect, useState } from 'react'
import { DollarSign, Users, TrendingUp, Wallet } from 'lucide-react'
import StatCard from '../components/StatCard'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { db } from '../lib/supabase'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPayroll: 0,
    totalEmployees: 0,
    activeTax: 0,
    netPay: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      await db.initializeSampleData()
      const employeeData = await db.getEmployees()
      setEmployees(employeeData)

      const totalSalary = employeeData.reduce((sum, emp) => sum + Number(emp.salary), 0)
      const totalDeductions = employeeData.reduce((sum, emp) => 
        sum + Number(emp.sss || 0) + Number(emp.philhealth || 0) + Number(emp.pagibig || 0), 0
      )
      
      setStats({
        totalPayroll: totalSalary,
        totalEmployees: employeeData.length,
        activeTax: totalDeductions,
        netPay: totalSalary - totalDeductions
      })
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Payroll',
      data: [450000, 480000, 520000, 490000, 550000, 580000],
      backgroundColor: 'rgba(102, 126, 234, 0.8)',
      borderRadius: 8,
    }]
  }

  const doughnutData = {
    labels: ['Engineering', 'Operations', 'Design', 'Marketing'],
    datasets: [{
      data: [35, 25, 20, 20],
      backgroundColor: [
        'rgba(102, 126, 234, 0.8)',
        'rgba(118, 75, 162, 0.8)',
        'rgba(79, 172, 254, 0.8)',
        'rgba(250, 112, 154, 0.8)',
      ],
      borderWidth: 0,
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Payroll"
          value={`₱${stats.totalPayroll.toLocaleString()}`}
          change="+8.2%"
          icon={DollarSign}
          gradient="gradient-primary"
        />
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          change="+12 this month"
          icon={Users}
          gradient="bg-gradient-to-br from-pink-500 to-rose-500"
        />
        <StatCard
          title="Active Tax"
          value={`₱${stats.activeTax.toLocaleString()}`}
          change="+5.1%"
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Net Pay"
          value={`₱${stats.netPay.toLocaleString()}`}
          change="+7.8%"
          icon={Wallet}
          gradient="bg-gradient-to-br from-amber-500 to-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Monthly Payroll Trend</h2>
            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Department Distribution</h2>
          <div className="h-80 flex items-center justify-center">
            <Doughnut data={doughnutData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Employees</h2>
          <button className="text-primary-500 text-sm font-semibold hover:text-primary-600">
            View All →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Position</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Salary</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 4).map((emp) => (
                <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{emp.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{emp.name}</p>
                        <p className="text-sm text-gray-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{emp.position}</td>
                  <td className="py-4 px-4 text-gray-700">{emp.department}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">₱{emp.salary.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      emp.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
