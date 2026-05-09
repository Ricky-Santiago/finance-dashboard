import { Link } from '@tanstack/react-router'
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Tag,
  Settings,
  X,
} from 'lucide-react'
import { useAuth } from '@/context/auth-context'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transacciones' },
  { to: '/budgets', icon: PiggyBank, label: 'Presupuestos' },
  { to: '/categories', icon: Tag, label: 'Categorías' },
  { to: '/settings', icon: Settings, label: 'Configuración' },
]

interface AppSidebarProps {
  open: boolean
  onClose: () => void
}

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const { profile, user } = useAuth()
  const displayName = profile?.full_name ?? user?.email

  return (
    <aside
      className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 min-h-screen flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
      }}
    >
      <div
        className="p-6 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border-color)' }}
      >
        <div>
          <h1 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Finance</h1>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Dashboard</p>
        </div>
        <button
          onClick={onClose}
          className="md:hidden transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm"
            style={{ color: 'var(--text-secondary)' }}
            activeProps={{
              style: {
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
              },
            }}
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        className="p-4"
        style={{ borderTop: '1px solid var(--border-color)' }}
      >
        <Link
          to="/settings"
          onClick={onClose}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ backgroundColor: 'var(--bg-tertiary)' }}
          >
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                {displayName?.[0]?.toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{displayName}</p>
            <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{user?.email}</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}