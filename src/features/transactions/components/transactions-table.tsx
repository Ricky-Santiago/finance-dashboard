import { flexRender } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { type Transaction } from '../data/schema'
import { type Category } from '@/features/categories/data/schema'
import { useTransactionsTable } from '../hooks/use-transactions-table'

interface TransactionsTableProps {
  data: Transaction[]
  categories: Category[]
  onDelete: (id: string) => void
  onEdit: (transaction: Transaction) => void
}

export function TransactionsTable({ data, categories, onDelete, onEdit }: TransactionsTableProps) {
  const {
    table, titleInput, setTitleInput, typeFilter,
    setTypeFilter, handleSearch, handleReset, isFiltered,
  } = useTransactionsTable({ data, categories, onDelete, onEdit })

  const inputStyle = {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  }

  return (
    <div
      className="rounded-xl"
      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <div
        className="p-4 flex flex-wrap items-center gap-2"
        style={{ borderBottom: '1px solid var(--border-color)' }}
      >
        <input
          value={titleInput}
          onChange={e => setTitleInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar transacción..."
          className="rounded-lg px-3 py-1.5 text-sm outline-none flex-1 min-w-40"
          style={inputStyle}
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as 'all' | 'income' | 'expense')}
          className="rounded-lg px-3 py-1.5 text-sm outline-none"
          style={inputStyle}
        >
          <option value="all">Todos</option>
          <option value="income">Ingresos</option>
          <option value="expense">Gastos</option>
        </select>
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
        >
          <Search size={14} />
          Buscar
        </button>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="px-2 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={14} />
            Limpiar
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="text-left text-xs font-medium px-6 py-3 cursor-pointer transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' && ' ↑'}
                    {header.column.getIsSorted() === 'desc' && ' ↓'}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-sm py-8" style={{ color: 'var(--text-secondary)' }}>
                  No hay transacciones
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className="transition-colors hover:opacity-80"
                  style={{ borderBottom: '1px solid var(--border-color)' }}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}