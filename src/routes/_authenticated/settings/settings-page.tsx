import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { SettingsFeature } from '@/features/settings'

export default function SettingsPage() {
  return (
    <AuthenticatedLayout title="Configuración">
      <SettingsFeature />
    </AuthenticatedLayout>
  )
}