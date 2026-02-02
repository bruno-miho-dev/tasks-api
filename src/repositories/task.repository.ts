import { prisma } from '@/config/database'
import { Task, CreateTaskDTO, UpdateTaskDTO, TaskFilters } from '@/types/task.types'

export class TaskRepository {
  async create(data: CreateTaskDTO): Promise<Task> {
    return await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
      },
    })
  }

  async findAll(filters?: TaskFilters): Promise<Task[]> {
    const where = filters?.search
      ? {
          OR: [
            { title: { contains: filters.search, mode: 'insensitive' as const } },
            { description: { contains: filters.search, mode: 'insensitive' as const } },
          ],
        }
      : undefined

    return await prisma.task.findMany({
      where,
      orderBy: { created_at: 'desc' },
    })
  }

  async findById(id: string): Promise<Task | null> {
    return await prisma.task.findUnique({
      where: { id },
    })
  }

  async update(id: string, data: UpdateTaskDTO): Promise<Task> {
    return await prisma.task.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: { id },
    })
  }

  async toggleComplete(id: string, currentStatus: Date | null): Promise<Task> {
    return await prisma.task.update({
      where: { id },
      data: {
        completed_at: currentStatus ? null : new Date(),
      },
    })
  }
}
