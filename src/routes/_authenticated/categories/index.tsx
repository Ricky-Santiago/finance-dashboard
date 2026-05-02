import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated/categories/')({
  component: CategoriesPage,
})

function CategoriesPage() {
  return (
    <AuthenticatedLayout title="Categorías">
      <p className="text-gray-400">Próximamente...</p>
    </AuthenticatedLayout>
  )
}
