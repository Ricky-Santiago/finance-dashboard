import { BudgetFormComponent } from './components/budget-form'
import { BudgetCard } from './components/budget-card'
import { useBudgets } from './hooks/use-budgets'

export function BudgetsFeature() {
  const { budgets, categories, isLoading, addBudget, deleteBudget } = useBudgets()

  return (
    <div className="flex flex-col gap-6">
      <BudgetFormComponent categories={categories} onAdd={addBudget} />

      {isLoading ? (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse h-32" />
      ) : budgets.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <p className="text-gray-400 text-sm">No tienes presupuestos este mes. Crea uno arriba.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map(budget => (
            <BudgetCard key={budget.id} budget={budget} onDelete={deleteBudget} />
          ))}
        </div>
      )}
    </div>
  )
}