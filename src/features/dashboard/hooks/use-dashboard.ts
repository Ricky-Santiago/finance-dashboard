import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DashboardMetrics {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  isLoading: boolean
  error: string | null
}

export function useDashboard(): DashboardMetrics {
  const [totalBalance, setTotalBalance] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [monthlyExpenses, setMonthlyExpenses] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const now = new Date()
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
          .toISOString()
          .split('T')[0]

        const { data, error: txError } = await supabase
          .from('transactions')
          .select('amount, type')

        if (txError) throw txError

        if (!data) return

        const income = data.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
        const expenses = data.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

        const { data: monthlyData, error: monthlyError } = await supabase
          .from('transactions')
          .select('amount, type')
          .gte('date', firstDayOfMonth)

        if (monthlyError) throw monthlyError

        if (monthlyData) {
          const mIncome = monthlyData.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
          const mExpenses = monthlyData.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
          setMonthlyIncome(mIncome)
          setMonthlyExpenses(mExpenses)
        }

        setTotalBalance(income - expenses)
      } catch (err) {
        setError('Error al cargar las métricas. Intenta recargar la página.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  return { totalBalance, monthlyIncome, monthlyExpenses, isLoading, error }
}