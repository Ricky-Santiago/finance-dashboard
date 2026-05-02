import { type ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { type Transaction } from '../data/schema'
import { type Category } from '@/features/categories/data/schema'

interface GetColumnsProps {
  categories: Category[]
  onDelete: (id: string) => Promise<void>
}

export function getTransactionsColumns({ categories, onDelete }: GetColumnsProps): ColumnDef<Transaction>[] {
  return [
    {
      accessorKey: 'date',
      header: 'Fecha',
      cell: ({ row }) => (
        <span className="text-gray-400 text-sm">
          {new Date(row.getValue('date')).toLocaleDateString('es-PE')}
        </span>
      ),
    },
    {
      accessorKey: 'title',
      header: 'Título',
      cell: ({ row }) => (
        <span className="text-white text-sm font-medium">{row.getValue('title')}</span>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
      cell: ({ row }) => {
        const type = row.getValue('type') as string
        return (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            type === 'income'
              ? 'bg-green-500/10 text-green-400'
              : 'bg-red-500/10 text-red-400'
          }`}>
            {type === 'income' ? 'Ingreso' : 'Gasto'}
          </span>
        )
      },
    },
    {
      accessorKey: 'category_id',
      header: 'Categoría',
      cell: ({ row }) => {
        const categoryId = row.getValue('category_id') as string | null
        const category = categories.find(c => c.id === categoryId)
        if (!category) return <span className="text-gray-500 text-sm">—</span>
        return (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
            <span className="text-gray-300 text-sm">{category.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'amount',
      header: 'Monto',
      cell: ({ row }) => {
        const amount = row.getValue('amount') as number
        const type = row.original.type
        return (
          <span className={`text-sm font-semibold ${
            type === 'income' ? 'text-green-400' : 'text-red-400'
          }`}>
            {type === 'income' ? '+' : '-'}${amount.toFixed(2)}
          </span>
        )
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <button
          onClick={() => onDelete(row.original.id)}
          className="text-gray-500 hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      ),
    },
  ]
}