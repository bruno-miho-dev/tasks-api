import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters'),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    })
    .min(1, 'Description cannot be empty')
    .max(1000, 'Description must be less than 1000 characters'),
})

export const updateTaskSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title cannot be empty')
      .max(255, 'Title must be less than 255 characters')
      .optional(),
    description: z
      .string()
      .min(1, 'Description cannot be empty')
      .max(1000, 'Description must be less than 1000 characters')
      .optional(),
  })
  .refine(data => data.title || data.description, {
    message: 'At least one field (title or description) must be provided',
  })

export const taskIdSchema = z.object({
  id: z.string().uuid('Invalid task ID format'),
})

export const taskQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().positive().max(100).default(10).optional(),
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
export type TaskIdInput = z.infer<typeof taskIdSchema>
export type TaskQueryInput = z.infer<typeof taskQuerySchema>
