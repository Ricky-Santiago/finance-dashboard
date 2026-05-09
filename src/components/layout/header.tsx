import { useNavigate } from '@tanstack/react-router'
import { LogOut, Menu, Sun, Moon } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useTheme } from '@/context/theme-provider'

interface HeaderProps {
  title: string
  onMenuClick: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  return (
    <header
      className="h-16 px-4 md:px-6 flex items-center justify-between flex-shrink-0"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Menu size={20} />
        </button>
        <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 transition-colors text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          <LogOut size={16} />
          <span className="hidden md:inline">Cerrar sesión</span>
        </button>
      </div>
    </header>
  )
}