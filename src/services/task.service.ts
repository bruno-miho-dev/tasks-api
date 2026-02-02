import { TaskRepository } from '@/repositories/task.repository'
import {
  CreateTaskDTO,
  UpdateTaskDTO,
  TaskFilters,
  PaginatedResponse,
  Task,
} from '@/types/task.types'
import { AppError } from '@/middlewares/error-handler'

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(data: CreateTaskDTO) {
    return await this.taskRepository.create(data)
  }

  async listTasks(filters?: TaskFilters): Promise<PaginatedResponse<Task>> {
    const page = filters?.page || 1
    const limit = filters?.limit || 10

    const [tasks, total] = await Promise.all([
      this.taskRepository.findAll(filters),
      this.taskRepository.count({
        search: filters?.search,
        completed: filters?.completed,
      }),
    ])

    return {
      data: tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async getTaskById(id: string) {
    const task = await this.taskRepository.findById(id)

    if (!task) {
      throw new AppError('Task not found', 404)
    }

    return task
  }

  async updateTask(id: string, data: UpdateTaskDTO) {
    await this.getTaskById(id)
    return await this.taskRepository.update(id, data)
  }

  async deleteTask(id: string) {
    await this.getTaskById(id)
    await this.taskRepository.delete(id)
  }

  async toggleTaskComplete(id: string) {
    const task = await this.getTaskById(id)
    return await this.taskRepository.toggleComplete(id, task.completed_at)
  }
}
