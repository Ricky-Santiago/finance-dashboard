import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '@/context/auth-context'
import { supabase } from '@/lib/supabase'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate({ to: '/login' })
  }

  const displayName = profile?.full_name ?? user?.email

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Cerrar sesión
          </button>
        </div>
        <p className="text-gray-400">Bienvenido, {displayName} 👋</p>
      </div>
    </div>
  )
}