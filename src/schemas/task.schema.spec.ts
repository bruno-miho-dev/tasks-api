import { describe, it, expect } from 'vitest'
import { createTaskSchema, updateTaskSchema, taskIdSchema } from './task.schema'

describe('Task Schemas', () => {
  describe('createTaskSchema', () => {
    it('should validate a valid task creation', () => {
      const validData = {
        title: 'Valid Task',
        description: 'Valid Description',
      }

      const result = createTaskSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject task without title', () => {
      const invalidData = {
        description: 'Valid Description',
      }

      const result = createTaskSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject task without description', () => {
      const invalidData = {
        title: 'Valid Task',
      }

      const result = createTaskSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject empty title', () => {
      const invalidData = {
        title: '',
        description: 'Valid Description',
      }

      const result = createTaskSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject title longer than 255 characters', () => {
      const invalidData = {
        title: 'a'.repeat(256),
        description: 'Valid Description',
      }

      const result = createTaskSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('updateTaskSchema', () => {
    it('should validate update with title only', () => {
      const validData = {
        title: 'Updated Title',
      }

      const result = updateTaskSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate update with description only', () => {
      const validData = {
        description: 'Updated Description',
      }

      const result = updateTaskSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate update with both fields', () => {
      const validData = {
        title: 'Updated Title',
        description: 'Updated Description',
      }

      const result = updateTaskSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject update with no fields', () => {
      const invalidData = {}

      const result = updateTaskSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('taskIdSchema', () => {
    it('should validate a valid UUID', () => {
      const validData = {
        id: '550e8400-e29b-41d4-a716-446655440000',
      }

      const result = taskIdSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid UUID', () => {
      const invalidData = {
        id: 'invalid-uuid',
      }

      const result = taskIdSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
