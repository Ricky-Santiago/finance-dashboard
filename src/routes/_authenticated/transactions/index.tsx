import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated/transactions/')({
  component: TransactionsPage,
})

function TransactionsPage() {
  return (
    <AuthenticatedLayout title="Transacciones">
      <p className="text-gray-400">Próximamente...</p>
    </AuthenticatedLayout>
  )
}