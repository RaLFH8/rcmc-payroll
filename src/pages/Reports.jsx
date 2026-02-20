const Reports = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-500">Generate and view payroll reports</p>
      </div>

      <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reports Coming Soon</h2>
          <p className="text-gray-500">
            Advanced reporting features including payroll summaries, tax reports, and analytics will be available here.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Reports
