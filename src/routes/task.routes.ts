import { Router } from 'express'
import { TaskController } from '@/controllers/task.controller'
import { TaskService } from '@/services/task.service'
import { TaskRepository } from '@/repositories/task.repository'
import { validate } from '@/middlewares/validate'
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  taskQuerySchema,
} from '@/schemas/task.schema'

const taskRepository = new TaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

export const taskRoutes = Router()

taskRoutes.post('/', validate(createTaskSchema, 'body'), taskController.createTask)
taskRoutes.get('/', validate(taskQuerySchema, 'query'), taskController.listTasks)
taskRoutes.get('/:id', validate(taskIdSchema, 'params'), taskController.getTask)
taskRoutes.put(
  '/:id',
  validate(taskIdSchema, 'params'),
  validate(updateTaskSchema, 'body'),
  taskController.updateTask
)
taskRoutes.delete('/:id', validate(taskIdSchema, 'params'), taskController.deleteTask)
taskRoutes.patch('/:id/complete', validate(taskIdSchema, 'params'), taskController.toggleComplete)
