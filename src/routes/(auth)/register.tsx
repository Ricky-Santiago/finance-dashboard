import { createFileRoute } from '@tanstack/react-router'
import { SignUpForm } from '@/features/auth/sign-up/components/sign-up-form'

export const Route = createFileRoute('/(auth)/register')({
  component: RegisterPage,
})

function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">Crear cuenta</h1>
        <p className="text-gray-400 mb-6">Regístrate para empezar</p>
        <SignUpForm />
      </div>
    </div>
  )
}