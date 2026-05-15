import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { budgetFormSchema, type BudgetForm } from '../data/schema'
import { type BudgetWithSpent } from '../hooks/use-budgets'
import { type Category } from '@/features/categories/data/schema'

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

interface EditBudgetDialogProps {
  budget: BudgetWithSpent | null
  categories: Category[]
  onClose: () => void
  onSave: (id: string, data: BudgetForm) => Promise<void>
}

export function EditBudgetDialog({ budget, categories, onClose, onSave }: EditBudgetDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BudgetForm>({
    resolver: zodResolver(budgetFormSchema),
  })

  useEffect(() => {
    if (budget) {
      reset({
        category_id: budget.category_id,
        amount: String(budget.amount),
        month: String(budget.month),
        year: String(budget.year),
      })
    }
  }, [budget, reset])

  if (!budget) return null

  const onSubmit = async (data: BudgetForm) => {
    await onSave(budget.id, data)
    onClose()
  }

  const inputStyle = {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative rounded-xl p-6 w-full max-w-md mx-4"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Editar presupuesto</h3>
          <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Categoría</label>
              <select {...register('category_id')} className="rounded-lg px-4 py-2 outline-none text-sm" style={inputStyle}>
                <option value="">Selecciona una categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              {errors.category_id && <span className="text-red-400 text-xs">{errors.category_id.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Monto límite</label>
              <input
                {...register('amount')}
                type="number"
                step="0.01"
                className="rounded-lg px-4 py-2 outline-none text-sm"
                style={inputStyle}
              />
              {errors.amount && <span className="text-red-400 text-xs">{errors.amount.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Mes</label>
              <select {...register('month')} className="rounded-lg px-4 py-2 outline-none text-sm" style={inputStyle}>
                {MONTHS.map((month, i) => (
                  <option key={i + 1} value={i + 1}>{month}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Año</label>
              <input
                {...register('year')}
                type="number"
                className="rounded-lg px-4 py-2 outline-none text-sm"
                style={inputStyle}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm transition-colors"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}