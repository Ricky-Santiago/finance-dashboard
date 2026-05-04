import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '@/context/auth-context'

export const Route = createFileRoute('/')({
  component: IndexPage,
})

function IndexPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400">Cargando...</p>
      </div>
    )
  }

  if (user) {
    return <Navigate to="/dashboard" />
  }

  return <Navigate to="/login" />
}