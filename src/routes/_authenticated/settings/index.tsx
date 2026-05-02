import { createFileRoute } from "@tanstack/react-router";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";

export const Route = createFileRoute("/_authenticated/settings/")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AuthenticatedLayout title="Configuración ">
      <p className="text-gray-400">Próximamente...</p>
    </AuthenticatedLayout>
  );
}
