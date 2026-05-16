import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { CategoriesFeature } from '@/features/categories'

export default function CategoriesPage() {
  return (
    <AuthenticatedLayout title="Categorías">
      <CategoriesFeature />
    </AuthenticatedLayout>
  )
}