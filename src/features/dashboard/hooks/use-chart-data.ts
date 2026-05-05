import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface MonthData {
  month: string
  ingresos: number
  gastos: number
}

export function useChartData() {
  const [data, setData] = useState<MonthData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchChartData = async () => {
      const now = new Date()
      const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)
        .toISOString()
        .split('T')[0]

      const { data: transactions } = await supabase
        .from('transactions')
        .select('amount, type, date')
        .gte('date', sixMonthsAgo)
        .order('date')

      if (!transactions) return

      const months: Record<string, MonthData> = {}

      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        const label = date.toLocaleDateString('es-PE', { month: 'short', year: '2-digit' })
        months[key] = { month: label, ingresos: 0, gastos: 0 }
      }

      transactions.forEach(tx => {
        const key = tx.date.slice(0, 7)
        if (months[key]) {
          if (tx.type === 'income') {
            months[key].ingresos += tx.amount
          } else {
            months[key].gastos += tx.amount
          }
        }
      })

      setData(Object.values(months))
      setIsLoading(false)
    }

    fetchChartData()
  }, [])

  return { data, isLoading }
}