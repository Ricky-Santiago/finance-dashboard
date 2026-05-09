import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Camera } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/auth-context'
import { profileFormSchema, type ProfileFormData, CURRENCIES } from './schema'

export function ProfileForm() {
  const { user, profile } = useAuth()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { full_name: '', phone: '', currency: 'USD' },
  })

  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name ?? '',
        phone: profile.phone ?? '',
        currency: profile.currency ?? 'USD',
      })
      setAvatarUrl(profile.avatar_url)
    }
  }, [profile, reset])

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploadingAvatar(true)
    const fileExt = file.name.split('.').pop()
    const filePath = `${user.id}/avatar.${fileExt}`
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })
    if (!uploadError) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      const publicUrl = `${data.publicUrl}?t=${Date.now()}`
      await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', user.id)
      setAvatarUrl(publicUrl)
    }
    setUploadingAvatar(false)
  }

  const onSubmit = async (data: ProfileFormData) => {
    if (!user) return
    await supabase.from('profiles').update({
      full_name: data.full_name,
      phone: data.phone ?? null,
      currency: data.currency,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
    reset(data)
  }

  const inputStyle = {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
  }

  return (
    <div
      className="rounded-xl p-6 max-w-lg"
      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
    >
      <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Información personal</h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Actualiza tus datos de perfil</p>

      <div className="flex items-center gap-4 mb-6">
        <div
          onClick={handleAvatarClick}
          className="relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer overflow-hidden group border-2 transition-colors"
          style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold" style={{ color: 'var(--text-secondary)' }}>
              {profile?.full_name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase()}
            </span>
          )}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={20} className="text-white" />
          </div>
          {uploadingAvatar && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Foto de perfil</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Click para cambiar. JPG, PNG máx 2MB</p>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Email</label>
          <input
            value={user?.email ?? ''}
            disabled
            className="rounded-lg px-4 py-2 text-sm cursor-not-allowed opacity-50"
            style={inputStyle}
          />
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>El email no se puede cambiar</span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Nombre completo</label>
          <input
            {...register('full_name')}
            placeholder="Juan Pérez García"
            className="rounded-lg px-4 py-2 outline-none text-sm"
            style={inputStyle}
          />
          {errors.full_name && <span className="text-red-400 text-xs">{errors.full_name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Teléfono</label>
          <input
            {...register('phone')}
            placeholder="+51 999 999 999"
            className="rounded-lg px-4 py-2 outline-none text-sm"
            style={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm" style={{ color: 'var(--text-secondary)' }}>Moneda preferida</label>
          <select
            {...register('currency')}
            className="rounded-lg px-4 py-2 outline-none text-sm"
            style={inputStyle}
          >
            {CURRENCIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {saveSuccess && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
            <span className="text-green-400 text-sm">Perfil actualizado correctamente</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>
    </div>
  )
}