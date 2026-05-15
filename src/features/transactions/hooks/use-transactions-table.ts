import { useState } from 'react'
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table'
import { type Transaction } from '../data/schema'
import { type Category } from '@/features/categories/data/schema'
import { getTransactionsColumns } from '../components/transactions-columns'

interface UseTransactionsTableProps {
  data: Transaction[]
  categories: Category[]
  onDelete: (id: string) => Promise<void>
  onEdit: (transaction: Transaction) => void
}

export function useTransactionsTable({ data, categories, onDelete, onEdit }: UseTransactionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [titleInput, setTitleInput] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all')

  const columns = getTransactionsColumns({ categories, onDelete, onEdit })

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
    const filters: ColumnFiltersState = []
    if (titleInput.trim()) filters.push({ id: 'title', value: titleInput.trim() })
    if (typeFilter !== 'all') filters.push({ id: 'type', value: typeFilter })
    setColumnFilters(filters)
  }

  const handleReset = () => {
    setTitleInput('')
    setTypeFilter('all')
    setColumnFilters([])
  }

  const isFiltered = titleInput.trim() !== '' || typeFilter !== 'all'

  return { table, titleInput, setTitleInput, typeFilter, setTypeFilter, handleSearch, handleReset, isFiltered }
}