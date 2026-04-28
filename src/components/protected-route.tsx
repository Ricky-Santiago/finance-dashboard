import { Navigate, Outlet } from '@tanstack/react-router'
import { useAuth } from '@/context/auth-context'

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}