import { useState } from 'react'
import { CategoryForm } from './components/category-form'
import { CategoriesTable } from './components/categories-table'
import { EditCategoryDialog } from './components/edit-category-dialog'
import { useCategories } from './hooks/use-categories'
import { type Category } from './data/schema'

export function CategoriesFeature() {
  const { categories, isLoading, addCategory, updateCategory, deleteCategory } = useCategories()
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  return (
    <div className="flex flex-col gap-6">
      <CategoryForm onAdd={addCategory} />

      {isLoading ? (
        <div
          className="rounded-xl p-6 animate-pulse h-32"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        />
      ) : (
        <CategoriesTable
          data={categories}
          onDelete={deleteCategory}
          onEdit={setEditingCategory}
        />
      )}

      <EditCategoryDialog
        category={editingCategory}
        onClose={() => setEditingCategory(null)}
        onSave={updateCategory}
      />
    </div>
  )
}