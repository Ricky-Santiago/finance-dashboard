import { useState } from 'react'
import { BudgetFormComponent } from './components/budget-form'
import { BudgetCard } from './components/budget-card'
import { EditBudgetDialog } from './components/edit-budget-dialog'
import { useBudgets, type BudgetWithSpent } from './hooks/use-budgets'

export function BudgetsFeature() {
  const { budgets, categories, isLoading, addBudget, updateBudget, deleteBudget } = useBudgets()
  const [editingBudget, setEditingBudget] = useState<BudgetWithSpent | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <BudgetFormComponent categories={categories} onAdd={addBudget} />

      {isLoading ? (
        <div
          className="rounded-xl p-6 animate-pulse h-32"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        />
      ) : budgets.length === 0 ? (
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            No tienes presupuestos este mes. Crea uno arriba.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map(budget => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              onDelete={deleteBudget}
              onEdit={setEditingBudget}
            />
          ))}
        </div>
      )}

      <EditBudgetDialog
        budget={editingBudget}
        categories={categories}
        onClose={() => setEditingBudget(null)}
        onSave={updateBudget}
      />
    </div>
  )
}