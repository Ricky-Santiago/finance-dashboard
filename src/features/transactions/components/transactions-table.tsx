import { flexRender } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { type Transaction } from '../data/schema'
import { type Category } from '@/features/categories/data/schema'
import { useTransactionsTable } from '../hooks/use-transactions-table'

interface TransactionsTableProps {
  data: Transaction[]
  categories: Category[]
  onDelete: (id: string) => Promise<void>
}

export function TransactionsTable({ data, categories, onDelete }: TransactionsTableProps) {
  const {
    table,
    titleInput,
    setTitleInput,
    typeFilter,
    setTypeFilter,
    handleSearch,
    handleReset,
    isFiltered,
  } = useTransactionsTable({ data, categories, onDelete })

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800">
      <div className="p-4 border-b border-gray-800 flex flex-wrap items-center gap-2">
        <input
          value={titleInput}
          onChange={e => setTitleInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar transacción..."
          className="bg-gray-800 text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 flex-1 min-w-40"
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value as 'all' | 'income' | 'expense')}
          className="bg-gray-800 text-white rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
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
            className="text-gray-400 hover:text-white px-2 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
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
              <tr key={headerGroup.id} className="border-b border-gray-800">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="text-left text-gray-400 text-xs font-medium px-6 py-3 cursor-pointer hover:text-white transition-colors"
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
                <td colSpan={6} className="text-center text-gray-400 text-sm py-8">
                  No hay transacciones
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
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