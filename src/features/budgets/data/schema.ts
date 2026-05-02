import { z } from 'zod'

export const budgetSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  category_id: z.string(),
  amount: z.number(),
  month: z.number(),
  year: z.number(),
  created_at: z.string(),
})

export const budgetFormSchema = z.object({
  category_id: z.string().min(1, 'Selecciona una categoría'),
  amount: z.string().min(1, 'El monto es requerido'),
  month: z.string(),
  year: z.string(),
})

export type Budget = z.infer<typeof budgetSchema>
export type BudgetForm = z.infer<typeof budgetFormSchema>