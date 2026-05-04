import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  user_id: z.string(),
  created_at: z.string(),
})

export type Category = z.infer<typeof categorySchema>