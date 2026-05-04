import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { transactionFormSchema, type TransactionForm } from '../data/schema'
import { type Category } from '@/features/categories/data/schema'

interface TransactionFormProps {
  categories: Category[]
  onAdd: (data: TransactionForm) => Promise<void>
}

export function TransactionFormComponent({ categories, onAdd }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data: TransactionForm) => {
    await onAdd(data)
    reset({
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h3 className="text-white font-medium mb-4">Nueva transacción</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Título</label>
          <input
            {...register('title')}
            placeholder="Ej: Salario, Supermercado"
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.title && <span className="text-red-400 text-xs">{errors.title.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Monto</label>
          <input
            {...register('amount')}
            type="number"
            step="0.01"
            placeholder="0.00"
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.amount && <span className="text-red-400 text-xs">{errors.amount.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Tipo</label>
          <select
            {...register('type')}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="expense">Gasto</option>
            <option value="income">Ingreso</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Categoría</label>
          <select
            {...register('category_id')}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.category_id && <span className="text-red-400 text-xs">{errors.category_id.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Fecha</label>
          <input
            {...register('date')}
            type="date"
            className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          {errors.date && <span className="text-red-400 text-xs">{errors.date.message}</span>}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 px-4 rounded-lg transition-colors text-sm"
      >
        <Plus size={16} />
        {isSubmitting ? 'Guardando...' : 'Agregar transacción'}
      </button>
    </form>
  )
}