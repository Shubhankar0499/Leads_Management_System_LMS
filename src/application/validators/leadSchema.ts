import { z } from 'zod'

export const createLeadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z
    .string()
    .email('Please enter a valid email address'),

  company: z
    .string()
    .min(2, 'Company must be at least 2 characters')
    .max(100, 'Company must be less than 100 characters'),

  phone: z
    .string()
    .min(10, 'Phone must be at least 10 digits')
    .max(15, 'Phone must be less than 15 digits'),

  status: z.enum(['new', 'contacted', 'qualified', 'lost'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),

  createdBy: z
    .string()
    .min(1, 'Created by is required'),
})

export const updateStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'lost'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
  updatedBy: z
    .string()
    .min(1, 'Updated by is required'),
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>