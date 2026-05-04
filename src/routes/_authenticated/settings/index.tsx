import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { SettingsFeature } from '@/features/settings'

export const Route = createFileRoute('/_authenticated/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <AuthenticatedLayout title="Configuración">
      <SettingsFeature />
    </AuthenticatedLayout>
  )
}