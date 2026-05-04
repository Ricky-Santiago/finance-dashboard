import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { BudgetsFeature } from '@/features/budgets'

export const Route = createFileRoute('/_authenticated/budgets/')({
  component: BudgetsPage,
})

function BudgetsPage() {
  return (
    <AuthenticatedLayout title="Presupuestos">
      <BudgetsFeature />
    </AuthenticatedLayout>
  )
}