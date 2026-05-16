import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { TransactionsFeature } from '@/features/transactions'

export default function TransactionsPage() {
  return (
    <AuthenticatedLayout title="Transacciones">
      <TransactionsFeature />
    </AuthenticatedLayout>
  )
}