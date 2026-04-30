import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '@/features/auth/sign-in/components/sign-in-form'

export const Route = createFileRoute('/(auth)/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">Finance Dashboard</h1>
        <p className="text-gray-400 mb-6">Inicia sesión en tu cuenta</p>
        <SignInForm />
      </div>
    </div>
  )
}