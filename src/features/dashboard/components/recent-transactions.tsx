import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { type Transaction } from '@/features/transactions/data/schema'
import { type Category } from '@/features/categories/data/schema'

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: txData }, { data: catData }] = await Promise.all([
        supabase.from('transactions').select('*').order('date', { ascending: false }).limit(5),
        supabase.from('categories').select('*'),
      ])

      if (txData) setTransactions(txData)
      if (catData) setCategories(catData)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse h-48" />
  }

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800">
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <h3 className="text-white font-medium">Transacciones recientes</h3>
        <Link
          to="/transactions"
          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 transition-colors"
        >
          Ver todas
          <ArrowRight size={14} />
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="p-6">
          <p className="text-gray-400 text-sm">No hay transacciones aún.</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-800">
          {transactions.map(tx => {
            const category = categories.find(c => c.id === tx.category_id)
            return (
              <li key={tx.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  {category && (
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{tx.title}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(tx.date).toLocaleDateString('es-PE')}
                      {category && ` · ${category.name}`}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${
                  tx.type === 'income' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}