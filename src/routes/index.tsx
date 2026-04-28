import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-white">Finance Dashboard</h1>
    </div>
  ),
})