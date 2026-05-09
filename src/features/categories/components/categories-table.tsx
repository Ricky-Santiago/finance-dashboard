import { flexRender } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'
import { type Category } from '../data/schema'
import { useCategoriesTable } from '../hooks/use-categories-table'

interface CategoriesTableProps {
  data: Category[]
  onDelete: (id: string) => Promise<void>
}

export function CategoriesTable({ data, onDelete }: CategoriesTableProps) {
  const { table, nameInput, setNameInput, handleSearch, handleReset, isFiltered } =
    useCategoriesTable({ data, onDelete })

  return (
    <div
      className="rounded-xl"
      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <div
        className="p-4 flex items-center gap-2"
        style={{ borderBottom: '1px solid var(--border-color)' }}
      >
        <input
          value={nameInput}
          onChange={e => setNameInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar categoría..."
          className="rounded-lg px-3 py-1.5 text-sm outline-none flex-1"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          }}
        />
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
                <td colSpan={4} className="text-center text-sm py-8" style={{ color: 'var(--text-secondary)' }}>
                  No hay categorías
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  style={{ borderBottom: '1px solid var(--border-color)' }}
                  className="transition-colors hover:opacity-80"
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