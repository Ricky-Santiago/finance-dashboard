import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { type Budget, type BudgetForm } from '../data/schema'
import { type Category } from '@/features/categories/data/schema'

export interface BudgetWithSpent extends Budget {
  spent: number
  percentage: number
  category: Category | null
}

export function useBudgets() {
  const [budgets, setBudgets] = useState<BudgetWithSpent[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const [{ data: budgetData }, { data: catData }, { data: txData }] = await Promise.all([
      supabase.from('budgets').select('*').eq('month', month).eq('year', year),
      supabase.from('categories').select('*').order('name'),
      supabase.from('transactions').select('amount, category_id, type').eq('type', 'expense'),
    ])

    if (catData) setCategories(catData)

    if (budgetData && txData && catData) {
      const budgetsWithSpent = budgetData.map(budget => {
        const spent = txData
          .filter(tx => tx.category_id === budget.category_id)
          .reduce((sum, tx) => sum + tx.amount, 0)
        const percentage = Math.min((spent / budget.amount) * 100, 100)
        const category = catData.find(c => c.id === budget.category_id) ?? null
        return { ...budget, spent, percentage, category }
      })
      setBudgets(budgetsWithSpent)
    }

    setIsLoading(false)
  }

  const addBudget = async (data: BudgetForm) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('budgets').insert({
      category_id: data.category_id,
      amount: parseFloat(data.amount),
      month: parseInt(data.month),
      year: parseInt(data.year),
      user_id: user.id,
    })

    if (!error) fetchData()
  }

  const updateBudget = async (id: string, data: BudgetForm) => {
    const { error } = await supabase
      .from('budgets')
      .update({
        category_id: data.category_id,
        amount: parseFloat(data.amount),
        month: parseInt(data.month),
        year: parseInt(data.year),
      })
      .eq('id', id)

    if (!error) fetchData()
  }

  const deleteBudget = async (id: string) => {
    const { error } = await supabase.from('budgets').delete().eq('id', id)
    if (!error) setBudgets(prev => prev.filter(b => b.id !== id))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { budgets, categories, isLoading, addBudget, updateBudget, deleteBudget }
}