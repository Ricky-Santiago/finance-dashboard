import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'
import { useDashboard } from '../hooks/use-dashboard'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function MetricCards() {
  const { totalBalance, monthlyIncome, monthlyExpenses, isLoading } = useDashboard()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="rounded-xl p-6 animate-pulse h-32"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Balance Total</p>
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <Wallet size={18} className="text-blue-400" />
          </div>
        </div>
        <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(totalBalance)}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Ingresos - Gastos totales</p>
      </div>

      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ingresos del mes</p>
          <div className="bg-green-500/10 p-2 rounded-lg">
            <TrendingUp size={18} className="text-green-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-green-400">{formatCurrency(monthlyIncome)}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Este mes</p>
      </div>

      <div
        className="rounded-xl p-6"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Gastos del mes</p>
          <div className="bg-red-500/10 p-2 rounded-lg">
            <TrendingDown size={18} className="text-red-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-red-400">{formatCurrency(monthlyExpenses)}</p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Este mes</p>
      </div>
    </div>
  )
}