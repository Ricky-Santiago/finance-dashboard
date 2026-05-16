import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { BudgetsFeature } from '@/features/budgets'

export default function BudgetsPage() {
  return (
    <AuthenticatedLayout title="Presupuestos">
      <BudgetsFeature />
    </AuthenticatedLayout>
  )
}