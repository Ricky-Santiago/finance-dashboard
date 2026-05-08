import { useNavigate } from '@tanstack/react-router'
import { LogOut, Menu } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface HeaderProps {
  title: string
  onMenuClick: () => void
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  return (
    <header className="h-16 border-b border-gray-800 px-4 md:px-6 flex items-center justify-between bg-gray-950 flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-400 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <h2 className="text-white font-semibold">{title}</h2>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
      >
        <LogOut size={16} />
        <span className="hidden md:inline">Cerrar sesión</span>
      </button>
    </header>
  )
}