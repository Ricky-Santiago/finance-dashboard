import { type ColumnDef } from '@tanstack/react-table'
import { Trash2, Pencil } from 'lucide-react'
import { type Category } from '../data/schema'

interface GetColumnsProps {
  onDelete: (id: string) => void
  onEdit: (category: Category) => void
}

export function getCategoriesColumns({ onDelete, onEdit }: GetColumnsProps): ColumnDef<Category>[] {
  return [
    {
      accessorKey: 'color',
      header: 'Color',
      cell: ({ row }) => (
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: row.getValue('color') }} />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: ({ row }) => (
        <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
          {row.getValue('name')}
        </span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Creada',
      cell: ({ row }) => (
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {new Date(row.getValue('created_at')).toLocaleDateString('es-PE')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(row.original)}
            className="text-gray-500 hover:text-blue-400 transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(row.original.id)}
            className="text-gray-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]
}