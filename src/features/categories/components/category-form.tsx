import { useState } from 'react'
import { Plus } from 'lucide-react'

const COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
]

interface CategoryFormProps {
  onAdd: (name: string, color: string) => Promise<void>
}

export function CategoryForm({ onAdd }: CategoryFormProps) {
  const [name, setName] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setIsLoading(true)
    await onAdd(name.trim(), color)
    setName('')
    setIsLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-6"
      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Nueva categoría</h3>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Nombre</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Ej: Comida, Salario, Transporte"
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

        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-2 rounded-lg transition-colors text-sm"
        >
          <Plus size={16} />
          {isLoading ? 'Guardando...' : 'Agregar categoría'}
        </button>
      </div>
    </form>
  )
}