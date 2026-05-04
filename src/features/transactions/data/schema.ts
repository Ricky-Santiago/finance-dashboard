import { z } from 'zod'

export const transactionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  amount: z.number(),
  type: z.enum(['income', 'expense']),
  category_id: z.string().nullable(),
  date: z.string(),
  created_at: z.string(),
})

export const transactionFormSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  amount: z.string().min(1, 'El monto es requerido'),
  type: z.enum(['income', 'expense']),
  category_id: z.string().min(1, 'Selecciona una categoría'),
  date: z.string().min(1, 'La fecha es requerida'),
})

export type Transaction = z.infer<typeof transactionSchema>
export type TransactionForm = z.infer<typeof transactionFormSchema>