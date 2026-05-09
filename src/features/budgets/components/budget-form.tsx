import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { budgetFormSchema, type BudgetForm } from '../data/schema'
import { type Category } from '@/features/categories/data/schema'

interface BudgetFormProps {
  categories: Category[]
  onAdd: (data: BudgetForm) => Promise<void>
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export function BudgetFormComponent({ categories, onAdd }: BudgetFormProps) {
  const now = new Date()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BudgetForm>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      month: String(now.getMonth() + 1),
      year: String(now.getFullYear()),
    },
  })

  const onSubmit = async (data: BudgetForm) => {
    await onAdd(data)
    reset({
      month: String(now.getMonth() + 1),
      year: String(now.getFullYear()),
    })
  }

  const inputStyle = {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl p-6"
      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Nuevo presupuesto</h3>

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
            placeholder="0.00"
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors text-sm"
      >
        <Plus size={16} />
        {isSubmitting ? 'Guardando...' : 'Agregar presupuesto'}
      </button>
    </form>
  )
}