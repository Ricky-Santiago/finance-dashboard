import { CategoryForm } from './components/category-form'
import { CategoriesTable } from './components/categories-table'
import { useCategories } from './hooks/use-categories'

export function CategoriesFeature() {
  const { categories, isLoading, addCategory, deleteCategory } = useCategories()

  return (
    <div className="flex flex-col gap-6">
      <CategoryForm onAdd={addCategory} />

      {isLoading ? (
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse h-32" />
      ) : (
        <CategoriesTable data={categories} onDelete={deleteCategory} />
      )}
    </div>
  )
}