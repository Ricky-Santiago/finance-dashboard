import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '@/features/auth/sign-up/components/sign-up-form'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

function RegisterPage() {
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
          Crear cuenta
        </h1>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Regístrate para empezar</p>
        <SignUpForm />
      </div>
    </div>
  )
}