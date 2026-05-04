import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { TransactionsFeature } from '@/features/transactions'

export const Route = createFileRoute('/_authenticated/transactions/')({
  component: TransactionsPage,
})

function TransactionsPage() {
  return (
    <AuthenticatedLayout title="Transacciones">
      <TransactionsFeature />
    </AuthenticatedLayout>
  )
}