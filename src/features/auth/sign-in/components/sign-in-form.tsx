import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'
import { loginSchema, type LoginForm } from '@/lib/schemas/auth'

export function SignInForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setError('root', { message: 'Email o contraseña incorrectos' })
      return
    }

    navigate({ to: '/dashboard' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="tu@email.com"
          className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-400 text-xs">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Contraseña</label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className="bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-red-400 text-xs">{errors.password.message}</span>
        )}
      </div>

      {errors.root && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          <span className="text-red-400 text-sm">{errors.root.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition-colors"
      >
        {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>

      <p className="text-center text-gray-400 text-sm">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-blue-400 hover:text-blue-300">
          Regístrate
        </Link>
      </p>
    </form>
  )
}