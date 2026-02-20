import { useEffect, useState } from 'react'
import { Printer, X } from 'lucide-react'
import { db } from '../lib/supabase'

const Payroll = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [previewEmployee, setPreviewEmployee] = useState(null)

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

  const printPayslip = () => {
    window.print()
  }

  const totalPayroll = employees.reduce((sum, emp) => sum + Number(emp.salary), 0)
  const totalDeductions = employees.reduce((sum, emp) => 
    sum + Number(emp.sss || 0) + Number(emp.philhealth || 0) + Number(emp.pagibig || 0), 0
  )
  const totalNetPay = totalPayroll - totalDeductions

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-spectro-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading payroll...</p>
        </div>
      </div>
    )
  }

  const PayslipPreview = ({ employee }) => {
    const totalDed = Number(employee.sss || 0) + Number(employee.philhealth || 0) + Number(employee.pagibig || 0)
    const netPay = Number(employee.salary) - totalDed
    const monthYear = new Date(selectedMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    
    return (
      <>
        {/* Modal - Hidden when printing */}
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 print:hidden">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Payslip Preview</h2>
              <div className="flex gap-2">
                <button
                  onClick={printPayslip}
                  className="flex items-center gap-2 px-4 py-2 bg-spectro-purple text-white rounded-lg hover:bg-spectro-purple/90 transition-colors"
                >
                  <Printer size={18} />
                  Print
                </button>
                <button
                  onClick={() => setPreviewEmployee(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-8">
              <PayslipContent employee={employee} totalDed={totalDed} netPay={netPay} monthYear={monthYear} />
            </div>
          </div>
        </div>
        
        {/* Print version - Only visible when printing */}
        <div className="hidden print:block print:p-8">
          <PayslipContent employee={employee} totalDed={totalDed} netPay={netPay} monthYear={monthYear} />
        </div>
      </>
    )
  }
  
  const PayslipContent = ({ employee, totalDed, netPay, monthYear }) => {
    return (
      <div>
        {/* Header */}
        <div className="text-center border-b-2 border-gray-900 pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">RIZALCARE MEDICAL CLINIC</h1>
          <p className="text-sm text-gray-700">GF IPDL8 Bldg., 25 G. Dikit St., Brgy. Bagumbayan, Pililla, Rizal</p>
          <p className="text-sm text-gray-700">Phone: 0938-775-1504 / 0976-273-9445</p>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900">PAYSLIP</h2>
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 mb-8 text-sm">
          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Employee Name:</span>
            <span className="text-gray-900">{employee.name}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Pay Period:</span>
            <span className="text-gray-900">{monthYear}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Position:</span>
            <span className="text-gray-900">{employee.position}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Date Issued:</span>
            <span className="text-gray-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex">
            <span className="font-semibold text-gray-700 w-32">Department:</span>
            <span className="text-gray-900">{employee.department}</span>
          </div>
        </div>

        {/* Earnings and Deductions */}
        <div className="border border-gray-300 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-3 px-4 text-gray-900">Basic Salary</td>
                <td className="py-3 px-4 text-right text-gray-900 font-mono">₱{employee.salary.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr className="bg-gray-50 border-b border-gray-300">
                <td className="py-2 px-4 font-semibold text-gray-900">Deductions</td>
                <td className="py-2 px-4"></td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 pl-8 text-gray-700">SSS Contribution</td>
                <td className="py-2 px-4 text-right text-gray-900 font-mono">₱{(employee.sss || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-4 pl-8 text-gray-700">PhilHealth Contribution</td>
                <td className="py-2 px-4 text-right text-gray-900 font-mono">₱{(employee.philhealth || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="py-2 px-4 pl-8 text-gray-700">Pag-IBIG Contribution</td>
                <td className="py-2 px-4 text-right text-gray-900 font-mono">₱{(employee.pagibig || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="py-3 px-4 font-semibold text-gray-900">Total Deductions</td>
                <td className="py-3 px-4 text-right text-gray-900 font-semibold font-mono">₱{totalDed.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Net Pay */}
        <div className="bg-gray-100 border-2 border-gray-900 p-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">NET PAY:</span>
            <span className="text-2xl font-bold text-gray-900 font-mono">₱{netPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-16 mt-16">
          <div className="text-center">
            <div className="border-t-2 border-gray-900 pt-2 mt-16">
              <p className="text-sm text-gray-700">Employee Signature</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-900 pt-2 mt-16">
              <p className="text-sm text-gray-700">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 print:hidden">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight dark:text-white text-slate-900">Payroll Management</h1>
          <p className="dark:text-gray-400 text-slate-600 text-sm mt-1">Process and manage employee payroll</p>
        </div>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 dark:bg-white/5 bg-white border dark:border-spectro-border border-slate-300 rounded-lg dark:text-gray-300 text-slate-900 focus:outline-none focus:border-spectro-purple"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm dark:text-gray-400 text-slate-600 font-medium mb-2">Total Payroll</p>
          <p className="text-3xl font-bold dark:text-white text-slate-900">₱{totalPayroll.toLocaleString()}</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm dark:text-gray-400 text-slate-600 font-medium mb-2">Total Deductions</p>
          <p className="text-3xl font-bold text-red-400">₱{totalDeductions.toLocaleString()}</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm dark:text-gray-400 text-slate-600 font-medium mb-2">Net Payroll</p>
          <p className="text-3xl font-bold text-spectro-teal">₱{totalNetPay.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl">
        <div className="p-6 border-b dark:border-spectro-border border-slate-200">
          <h2 className="text-xl font-bold dark:text-white text-slate-900 tracking-tight">Payroll Breakdown</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-spectro-border border-slate-200">
                <th className="text-left py-4 px-6 text-xs font-semibold dark:text-gray-500 text-slate-600 uppercase tracking-wider">Employee</th>
                <th className="text-left py-4 px-6 text-xs font-semibold dark:text-gray-500 text-slate-600 uppercase tracking-wider">Basic Salary</th>
                <th className="text-left py-4 px-6 text-xs font-semibold dark:text-gray-500 text-slate-600 uppercase tracking-wider">SSS</th>
                <th className="text-left py-4 px-6 text-xs font-semibold dark:text-gray-500 text-slate-600 uppercase tracking-wider">PhilHealth</th>
                <th className="text-left py-4 px-6 text-xs font-semibold dark:text-gray-500 text-slate-600 uppercase tracking-wider">Pag-IBIG</th>
                <th className="text-left py-4 px-6 text-xs font-semibold dark:text-gray-500 text-slate-600 uppercase tracking-wider">Total Deductions</th>
                <th className="text-left py-4 px-6 text-xs font-semibold dark:text-gray-500 text-slate-600 uppercase tracking-wider">Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => {
                const totalDed = Number(emp.sss || 0) + Number(emp.philhealth || 0) + Number(emp.pagibig || 0)
                const netPay = Number(emp.salary) - totalDed
                
                return (
                  <tr key={emp.id} className="border-b dark:border-spectro-border border-slate-100 dark:hover:bg-white/5 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div 
                        className="flex items-center gap-3 cursor-pointer hover:text-spectro-teal transition-colors"
                        onClick={() => setPreviewEmployee(emp)}
                      >
                        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{emp.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-semibold dark:text-white text-slate-900 text-sm hover:text-spectro-teal">{emp.name}</p>
                          <p className="text-xs dark:text-gray-500 text-slate-500">{emp.position}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold dark:text-white text-slate-900 text-sm">₱{emp.salary.toLocaleString()}</td>
                    <td className="py-4 px-6 dark:text-gray-300 text-slate-700 text-sm">₱{(emp.sss || 0).toLocaleString()}</td>
                    <td className="py-4 px-6 dark:text-gray-300 text-slate-700 text-sm">₱{(emp.philhealth || 0).toLocaleString()}</td>
                    <td className="py-4 px-6 dark:text-gray-300 text-slate-700 text-sm">₱{(emp.pagibig || 0).toLocaleString()}</td>
                    <td className="py-4 px-6 font-semibold text-red-400 text-sm">₱{totalDed.toLocaleString()}</td>
                    <td className="py-4 px-6 font-bold text-spectro-teal text-sm">₱{netPay.toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {previewEmployee && <PayslipPreview employee={previewEmployee} />}
    </div>
  )
}

export default Payroll
