import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'
import { AppError } from './error-handler'

export const validate = (schema: ZodSchema, source: 'body' | 'params' | 'query' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = source === 'body' ? req.body : source === 'params' ? req.params : req.query

      const validated = schema.parse(data)

      if (source === 'body') req.body = validated
      if (source === 'params') req.params = validated
      if (source === 'query') req.query = validated

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }))

        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: formattedErrors,
        })
      }

      next(error)
    }
  }
}
