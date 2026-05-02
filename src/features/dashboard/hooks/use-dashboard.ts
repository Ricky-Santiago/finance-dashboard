import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DashboardMetrics {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  isLoading: boolean
}

export function useDashboard(): DashboardMetrics {
  const [totalBalance, setTotalBalance] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [monthlyExpenses, setMonthlyExpenses] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMetrics = async () => {
      const now = new Date()
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split('T')[0]

      const { data } = await supabase
        .from('transactions')
        .select('amount, type')

      if (!data) return

      const income = data
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

      const expenses = data
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

      const { data: monthlyData } = await supabase
        .from('transactions')
        .select('amount, type')
        .gte('date', firstDayOfMonth)

      if (monthlyData) {
        const mIncome = monthlyData
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0)

        const mExpenses = monthlyData
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)

        setMonthlyIncome(mIncome)
        setMonthlyExpenses(mExpenses)
      }

      setTotalBalance(income - expenses)
      setIsLoading(false)
    }

    fetchMetrics()
  }, [])

  return { totalBalance, monthlyIncome, monthlyExpenses, isLoading }
}