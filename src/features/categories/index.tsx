import { useState } from 'react'
import { CategoryForm } from './components/category-form'
import { CategoriesTable } from './components/categories-table'
import { EditCategoryDialog } from './components/edit-category-dialog'
import { useCategories } from './hooks/use-categories'
import { type Category } from './data/schema'
import { ConfirmDialog } from '@/components/confirm-dialog'

export function CategoriesFeature() {
  const { categories, isLoading, addCategory, updateCategory, deleteCategory } = useCategories()
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!deletingId) return
    setIsDeleting(true)
    await deleteCategory(deletingId)
    setIsDeleting(false)
    setDeletingId(null)
  }

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
          onDelete={(id) => setDeletingId(id)}
          onEdit={setEditingCategory}
        />
      )}

      <EditCategoryDialog
        category={editingCategory}
        onClose={() => setEditingCategory(null)}
        onSave={updateCategory}
      />

      <ConfirmDialog
        open={!!deletingId}
        title="Eliminar categoría"
        description="¿Estás seguro? Esta acción no se puede deshacer y eliminará la categoría permanentemente."
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
        isLoading={isDeleting}
      />
    </div>
  )
}