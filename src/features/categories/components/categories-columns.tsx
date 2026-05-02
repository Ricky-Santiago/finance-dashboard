import { type ColumnDef } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'
import { type Category } from '../data/schema'

interface GetColumnsProps {
  onDelete: (id: string) => Promise<void>
}

export function getCategoriesColumns({ onDelete }: GetColumnsProps): ColumnDef<Category>[] {
  return [
    {
      accessorKey: 'color',
      header: 'Color',
      cell: ({ row }) => (
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: row.getValue('color') }}
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
      cell: ({ row }) => (
        <span className="text-white text-sm">{row.getValue('name')}</span>
      ),
    },
    {
      accessorKey: 'created_at',
      header: 'Creada',
      cell: ({ row }) => (
        <span className="text-gray-400 text-sm">
          {new Date(row.getValue('created_at')).toLocaleDateString('es-PE')}
        </span>
      ),
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