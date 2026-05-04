import { z } from 'zod'

export const profileFormSchema = z.object({
  full_name: z.string().min(2, 'Nombre muy corto'),
  phone: z.string().optional(),
  currency: z.string().min(1, 'Selecciona una moneda'),
})

export type ProfileFormData = z.infer<typeof profileFormSchema>

export const CURRENCIES = [
  { value: 'USD', label: 'USD — Dólar americano' },
  { value: 'PEN', label: 'PEN — Sol peruano' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'MXN', label: 'MXN — Peso mexicano' },
  { value: 'COP', label: 'COP — Peso colombiano' },
  { value: 'ARS', label: 'ARS — Peso argentino' },
]