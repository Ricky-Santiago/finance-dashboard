import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '@/features/auth/sign-in/components/sign-in-form'

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        className="p-8 rounded-xl w-full max-w-md"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Finance Dashboard
        </h1>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Inicia sesión en tu cuenta</p>
        <SignInForm />
      </div>
    </div>
  )
}