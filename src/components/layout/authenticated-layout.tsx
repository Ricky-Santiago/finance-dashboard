import { AppSidebar } from './app-sidebar'
import { Header } from './header'

interface AuthenticatedLayoutProps {
  title: string
  children: React.ReactNode
}

export function AuthenticatedLayout({ title, children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-950">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}