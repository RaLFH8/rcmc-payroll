import { useEffect, useState } from 'react'
import { db } from '../lib/supabase'

const Payroll = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async () => {
    try {
      setLoading(true)
      const data = await db.getEmployees()
      setEmployees(data)
    } catch (error) {
      console.error('Error loading employees:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateNetPay = (emp) => {
    const deductions = Number(emp.sss || 0) + Number(emp.philhealth || 0) + Number(emp.pagibig || 0)
    return Number(emp.salary) - deductions
  }

  const totalPayroll = employees.reduce((sum, emp) => sum + Number(emp.salary), 0)
  const totalDeductions = employees.reduce((sum, emp) => 
    sum + Number(emp.sss || 0) + Number(emp.philhealth || 0) + Number(emp.pagibig || 0), 0
  )
  const totalNetPay = totalPayroll - totalDeductions

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading payroll...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll Management</h1>
          <p className="text-gray-500">Process and manage employee payroll</p>
        </div>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium mb-2">Total Payroll</p>
          <p className="text-3xl font-bold text-gray-900">₱{totalPayroll.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium mb-2">Total Deductions</p>
          <p className="text-3xl font-bold text-red-600">₱{totalDeductions.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium mb-2">Net Payroll</p>
          <p className="text-3xl font-bold text-green-600">₱{totalNetPay.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Payroll Breakdown</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Employee</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Basic Salary</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">SSS</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">PhilHealth</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Pag-IBIG</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Total Deductions</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => {
                const totalDed = Number(emp.sss || 0) + Number(emp.philhealth || 0) + Number(emp.pagibig || 0)
                const netPay = Number(emp.salary) - totalDed
                
                return (
                  <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{emp.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{emp.name}</p>
                          <p className="text-sm text-gray-500">{emp.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">₱{emp.salary.toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-700">₱{(emp.sss || 0).toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-700">₱{(emp.philhealth || 0).toLocaleString()}</td>
                    <td className="py-4 px-6 text-gray-700">₱{(emp.pagibig || 0).toLocaleString()}</td>
                    <td className="py-4 px-6 font-semibold text-red-600">₱{totalDed.toLocaleString()}</td>
                    <td className="py-4 px-6 font-bold text-green-600">₱{netPay.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Payroll
