import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { CategoriesFeature } from '@/features/categories'

export const Route = createFileRoute('/_authenticated/categories/')({
  component: CategoriesPage,
})

function CategoriesPage() {
  return (
    <AuthenticatedLayout title="Categorías">
      <CategoriesFeature />
    </AuthenticatedLayout>
  )
}