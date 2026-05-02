import { Trash2 } from 'lucide-react'
import { type BudgetWithSpent } from '../hooks/use-budgets'

interface BudgetCardProps {
  budget: BudgetWithSpent
  onDelete: (id: string) => Promise<void>
}

export function BudgetCard({ budget, onDelete }: BudgetCardProps) {
  const getBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getTextColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-400'
    if (percentage >= 75) return 'text-yellow-400'
    return 'text-green-400'
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {budget.category && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: budget.category.color }}
            />
          )}
          <span className="text-white font-medium text-sm">
            {budget.category?.name ?? 'Sin categoría'}
          </span>
        </div>
        <button
          onClick={() => onDelete(budget.id)}
          className="text-gray-500 hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-end justify-between mb-2">
        <span className={`text-2xl font-bold ${getTextColor(budget.percentage)}`}>
          ${budget.spent.toFixed(2)}
        </span>
        <span className="text-gray-400 text-sm">de ${budget.amount.toFixed(2)}</span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getBarColor(budget.percentage)}`}
          style={{ width: `${budget.percentage}%` }}
        />
      </div>

      <p className="text-gray-500 text-xs mt-2">{budget.percentage.toFixed(0)}% utilizado</p>
    </div>
  )
}