import { Request, Response, NextFunction } from 'express'
import { TaskService } from '@/services/task.service'

export class TaskController {
  constructor(private taskService: TaskService) {}

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.createTask(req.body)
      return res.status(201).json(task)
    } catch (error) {
      next(error)
    }
  }

  listTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search } = req.query
      const tasks = await this.taskService.listTasks({
        search: search as string,
      })
      return res.json(tasks)
    } catch (error) {
      next(error)
    }
  }

  getTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.getTaskById(req.params.id)
      return res.json(task)
    } catch (error) {
      next(error)
    }
  }

  updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.updateTask(req.params.id, req.body)
      return res.json(task)
    } catch (error) {
      next(error)
    }
  }

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.taskService.deleteTask(req.params.id)
      return res.status(204).send()
    } catch (error) {
      next(error)
    }
  }

  toggleComplete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await this.taskService.toggleTaskComplete(req.params.id)
      return res.json(task)
    } catch (error) {
      next(error)
    }
  }
}
