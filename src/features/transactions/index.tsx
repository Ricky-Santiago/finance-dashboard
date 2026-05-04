import { TransactionFormComponent } from './components/transaction-form'
import { TransactionsTable } from './components/transactions-table'
import { useTransactions } from './hooks/use-transactions'

export function TransactionsFeature() {
  const { transactions, categories, isLoading, addTransaction, deleteTransaction } = useTransactions()

  return (
    <div className="flex flex-col gap-6">
      <TransactionFormComponent categories={categories} onAdd={addTransaction} />

      {isLoading ? (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse h-32" />
      ) : (
        <TransactionsTable
          data={transactions}
          categories={categories}
          onDelete={deleteTransaction}
        />
      )}
    </div>
  )
}