import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { AlertTriangle } from 'lucide-react'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  errorComponent: ({ error }) => (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-md mx-4">
        <div className="flex justify-center mb-4">
          <div className="bg-red-500/10 p-4 rounded-full">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
        </div>
        <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Algo salió mal
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          {error?.message ?? 'Ocurrió un error inesperado. Por favor intenta de nuevo.'}
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4" style={{ color: 'var(--bg-tertiary)' }}>404</h1>
        <p className="text-xl font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Página no encontrada</p>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          La página que buscas no existe o fue movida.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  ),
})