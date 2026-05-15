import { useEffect } from 'react'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionFormSchema, type TransactionForm, type Transaction } from '../data/schema'
import { type Category } from '@/features/categories/data/schema'

interface EditTransactionDialogProps {
  transaction: Transaction | null
  categories: Category[]
  onClose: () => void
  onSave: (id: string, data: TransactionForm) => Promise<void>
}

export function EditTransactionDialog({ transaction, categories, onClose, onSave }: EditTransactionDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionFormSchema),
  })

  useEffect(() => {
    if (transaction) {
      reset({
        title: transaction.title,
        amount: String(transaction.amount),
        type: transaction.type,
        category_id: transaction.category_id ?? '',
        date: transaction.date,
      })
    }
  }, [transaction, reset])

  if (!transaction) return null

  const onSubmit = async (data: TransactionForm) => {
    await onSave(transaction.id, data)
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
        className="relative rounded-xl p-6 w-full max-w-lg mx-4"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Editar transacción</h3>
          <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Título</label>
              <input
                {...register('title')}
                className="rounded-lg px-4 py-2 outline-none text-sm"
                style={inputStyle}
              />
              {errors.title && <span className="text-red-400 text-xs">{errors.title.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Monto</label>
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
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tipo</label>
              <select {...register('type')} className="rounded-lg px-4 py-2 outline-none text-sm" style={inputStyle}>
                <option value="expense">Gasto</option>
                <option value="income">Ingreso</option>
              </select>
            </div>

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
              <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Fecha</label>
              <input
                {...register('date')}
                type="date"
                className="rounded-lg px-4 py-2 outline-none text-sm"
                style={inputStyle}
              />
              {errors.date && <span className="text-red-400 text-xs">{errors.date.message}</span>}
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