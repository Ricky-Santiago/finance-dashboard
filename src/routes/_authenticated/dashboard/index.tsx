import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { MetricCards } from '@/features/dashboard/components/metric-cards'
import { useAuth } from '@/context/auth-context'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { profile, user } = useAuth()
  const displayName = profile?.full_name ?? user?.email

  return (
    <AuthenticatedLayout title="Dashboard">
      <div className="flex flex-col gap-6">
        <p className="text-gray-400">Bienvenido, {displayName} 👋</p>
        <MetricCards />
      </div>
    </AuthenticatedLayout>
  )
}