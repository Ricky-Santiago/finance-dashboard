import { useState } from 'react'
import { TransactionFormComponent } from './components/transaction-form'
import { TransactionsTable } from './components/transactions-table'
import { EditTransactionDialog } from './components/edit-transaction-dialog'
import { useTransactions } from './hooks/use-transactions'
import { type Transaction } from './data/schema'

export function TransactionsFeature() {
  const { transactions, categories, isLoading, addTransaction, updateTransaction, deleteTransaction } = useTransactions()
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <TransactionFormComponent categories={categories} onAdd={addTransaction} />

      {isLoading ? (
        <div
          className="rounded-xl p-6 animate-pulse h-32"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        />
      ) : (
        <TransactionsTable
          data={transactions}
          categories={categories}
          onDelete={deleteTransaction}
          onEdit={setEditingTransaction}
        />
      )}

      <EditTransactionDialog
        transaction={editingTransaction}
        categories={categories}
        onClose={() => setEditingTransaction(null)}
        onSave={updateTransaction}
      />
    </div>
  )
}