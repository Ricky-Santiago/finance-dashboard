import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { type Category } from '../data/schema'

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
]

interface EditCategoryDialogProps {
  category: Category | null
  onClose: () => void
  onSave: (id: string, name: string, color: string) => Promise<void>
}

export function EditCategoryDialog({ category, onClose, onSave }: EditCategoryDialogProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (category) {
      setName(category.name)
      setColor(category.color)
    }
  }, [category])

  if (!category) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setIsLoading(true)
    await onSave(category.id, name.trim(), color)
    setIsLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative rounded-xl p-6 w-full max-w-md mx-4"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Editar categoría</h3>
          <button onClick={onClose} style={{ color: 'var(--text-secondary)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Nombre</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="rounded-lg px-4 py-2 outline-none text-sm"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
              }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: c, borderColor: color === c ? 'var(--text-primary)' : 'transparent' }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm transition-colors"
              style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !name.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {isLoading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}