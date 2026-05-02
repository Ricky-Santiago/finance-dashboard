import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated/budgets/')({
  component: BudgetsPage,
})

function BudgetsPage() {
  return (
    <AuthenticatedLayout title="Presupuestos">
      <p className="text-gray-400">Próximamente...</p>
    </AuthenticatedLayout>
  )
}
