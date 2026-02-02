import { Router } from 'express'
import { TaskController } from '@/controllers/task.controller'
import { TaskService } from '@/services/task.service'
import { TaskRepository } from '@/repositories/task.repository'

const taskRepository = new TaskRepository()
const taskService = new TaskService(taskRepository)
const taskController = new TaskController(taskService)

export const taskRoutes = Router()

taskRoutes.post('/', taskController.createTask)
taskRoutes.get('/', taskController.listTasks)
taskRoutes.get('/:id', taskController.getTask)
taskRoutes.put('/:id', taskController.updateTask)
taskRoutes.delete('/:id', taskController.deleteTask)
taskRoutes.patch('/:id/complete', taskController.toggleComplete)
