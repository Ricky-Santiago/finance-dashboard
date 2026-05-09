import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, Link } from '@tanstack/react-router'
import { supabase } from '@/lib/supabase'
import { registerSchema, type RegisterForm } from '@/lib/schemas/auth'

export function SignUpForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterForm) => {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })

    if (signUpError) {
      setError('root', { message: signUpError.message })
      return
    }

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: data.fullName })
        .eq('id', authData.user.id)

      if (profileError) {
        setError('root', { message: 'Error al guardar el perfil' })
        return
      }
    }

    navigate({ to: '/dashboard' })
  }

  const inputStyle = {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Nombre completo</label>
        <input
          {...register('fullName')}
          type="text"
          placeholder="Juan Pérez García"
          className="rounded-lg px-4 py-2 outline-none text-sm"
          style={inputStyle}
        />
        {errors.fullName && <span className="text-red-400 text-xs">{errors.fullName.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="tu@email.com"
          className="rounded-lg px-4 py-2 outline-none text-sm"
          style={inputStyle}
        />
        {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Contraseña</label>
        <input
          {...register('password')}
          type="password"
          placeholder="••••••••"
          className="rounded-lg px-4 py-2 outline-none text-sm"
          style={inputStyle}
        />
        {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Confirmar contraseña</label>
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="••••••••"
          className="rounded-lg px-4 py-2 outline-none text-sm"
          style={inputStyle}
        />
        {errors.confirmPassword && <span className="text-red-400 text-xs">{errors.confirmPassword.message}</span>}
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
        {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

      <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-blue-400 hover:text-blue-300">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}