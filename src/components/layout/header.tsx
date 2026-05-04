import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  return (
    <header className="h-16 border-b border-gray-800 px-6 flex items-center justify-between bg-gray-950">
      <h2 className="text-white font-semibold">{title}</h2>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
      >
        <LogOut size={16} />
        Cerrar sesión
      </button>
    </header>
  )
}