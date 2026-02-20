import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const db = {
  // Employees
  async getEmployees() {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async addEmployee(employee) {
    const { data, error } = await supabase
      .from('employees')
      .insert([employee])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateEmployee(id, updates) {
    const { data, error } = await supabase
      .from('employees')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async deleteEmployee(id) {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Payroll Records
  async getPayrollRecords() {
    const { data, error } = await supabase
      .from('payroll_records')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async addPayrollRecord(record) {
    const { data, error } = await supabase
      .from('payroll_records')
      .insert([record])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Initialize sample data
  async initializeSampleData() {
    const { count } = await supabase
      .from('employees')
      .select('*', { count: 'exact', head: true })
    
    if (count === 0) {
      const sampleEmployees = [
        {
          name: 'Darlene Steffy',
          email: 'darlene@spectro.com',
          position: 'Software Engineer',
          department: 'Engineering',
          salary: 85000,
          status: 'Active',
          join_date: '2023-01-15',
          sss: 2500,
          philhealth: 1500,
          pagibig: 200
        },
        {
          name: 'Darrell Steward',
          email: 'darrell@spectro.com',
          position: 'Business Analyst',
          department: 'Operations',
          salary: 65000,
          status: 'Active',
          join_date: '2023-03-20',
          sss: 2000,
          philhealth: 1200,
          pagibig: 200
        },
        {
          name: 'Nessa Cooper',
          email: 'nessa@spectro.com',
          position: 'Product Designer',
          department: 'Design',
          salary: 75000,
          status: 'Active',
          join_date: '2023-02-10',
          sss: 2200,
          philhealth: 1300,
          pagibig: 200
        },
        {
          name: 'Marvin McKinney',
          email: 'marvin@spectro.com',
          position: 'Marketing Manager',
          department: 'Marketing',
          salary: 70000,
          status: 'Active',
          join_date: '2023-04-05',
          sss: 2100,
          philhealth: 1250,
          pagibig: 200
        }
      ]

      await supabase.from('employees').insert(sampleEmployees)
    }
  }
}
