import { useState } from 'react'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table'
import { type Category } from '../data/schema'
import { getCategoriesColumns } from '../components/categories-columns'

interface UseCategoriesTableProps {
  data: Category[]
  onDelete: (id: string) => Promise<void>
  onEdit: (category: Category) => void
}

export function useCategoriesTable({ data, onDelete, onEdit }: UseCategoriesTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [nameInput, setNameInput] = useState('')

  const columns = getCategoriesColumns({ onDelete, onEdit })

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const handleSearch = () => {
    table.getColumn('name')?.setFilterValue(nameInput)
  }

  const handleReset = () => {
    setNameInput('')
    table.getColumn('name')?.setFilterValue('')
  }

  const isFiltered = nameInput.trim() !== ''

  return { table, nameInput, setNameInput, handleSearch, handleReset, isFiltered }
}