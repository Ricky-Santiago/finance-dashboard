import { createFileRoute } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const DashboardPage = lazy(() => import('./dashboard-page.tsx'))

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: () => (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <DashboardPage />
    </Suspense>
  ),
})