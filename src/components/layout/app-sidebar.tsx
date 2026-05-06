import { Link } from '@tanstack/react-router'
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Tag,
  Settings,
} from 'lucide-react'
import { useAuth } from '@/context/auth-context'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transacciones' },
  { to: '/budgets', icon: PiggyBank, label: 'Presupuestos' },
  { to: '/categories', icon: Tag, label: 'Categorías' },
  { to: '/settings', icon: Settings, label: 'Configuración' },
]

export function AppSidebar() {
  const { profile, user } = useAuth()
  const displayName = profile?.full_name ?? user?.email

  return (
    <aside className="w-64 min-h-screen bg-gray-900 flex flex-col border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-white font-bold text-lg">Finance</h1>
        <p className="text-gray-400 text-xs mt-1">Dashboard</p>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-sm"
            activeProps={{ className: 'flex items-center gap-3 px-3 py-2 rounded-lg text-white bg-gray-800 text-sm' }}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Link
          to="/settings"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-xs font-bold">
                {displayName?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-white text-xs font-medium truncate">{displayName}</p>
            <p className="text-gray-500 text-xs truncate">{user?.email}</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}