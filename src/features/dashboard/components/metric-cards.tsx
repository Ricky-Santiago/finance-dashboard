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
          <div key={i} className="bg-gray-900 rounded-xl p-6 animate-pulse h-32" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-sm">Balance Total</p>
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <Wallet size={18} className="text-blue-400" />
          </div>
        </div>
        <p className="text-white text-2xl font-bold">{formatCurrency(totalBalance)}</p>
        <p className="text-gray-500 text-xs mt-1">Ingresos - Gastos totales</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-sm">Ingresos del mes</p>
          <div className="bg-green-500/10 p-2 rounded-lg">
            <TrendingUp size={18} className="text-green-400" />
          </div>
        </div>
        <p className="text-green-400 text-2xl font-bold">{formatCurrency(monthlyIncome)}</p>
        <p className="text-gray-500 text-xs mt-1">Este mes</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400 text-sm">Gastos del mes</p>
          <div className="bg-red-500/10 p-2 rounded-lg">
            <TrendingDown size={18} className="text-red-400" />
          </div>
        </div>
        <p className="text-red-400 text-2xl font-bold">{formatCurrency(monthlyExpenses)}</p>
        <p className="text-gray-500 text-xs mt-1">Este mes</p>
      </div>
    </div>
  )
}