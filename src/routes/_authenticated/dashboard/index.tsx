import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { useAuth } from '@/context/auth-context'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { profile, user } = useAuth()
  const displayName = profile?.full_name ?? user?.email

  return (
    <AuthenticatedLayout title="Dashboard">
      <p className="text-gray-400">Bienvenido, {displayName} 👋</p>
    </AuthenticatedLayout>
  )
}