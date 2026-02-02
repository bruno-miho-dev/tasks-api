import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TaskService } from './task.service'
import { TaskRepository } from '@/repositories/task.repository'
import { AppError } from '@/middlewares/error-handler'

vi.mock('@/repositories/task.repository')

describe('TaskService', () => {
  let taskService: TaskService
  let taskRepository: TaskRepository

  beforeEach(() => {
    taskRepository = new TaskRepository()
    taskService = new TaskService(taskRepository)
  })

  describe('createTask', () => {
    it('should create a task successfully', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test Description',
      }

      const createdTask = {
        id: '1',
        ...taskData,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      vi.spyOn(taskRepository, 'create').mockResolvedValue(createdTask)

      const result = await taskService.createTask(taskData)

      expect(result).toEqual(createdTask)
      expect(taskRepository.create).toHaveBeenCalledWith(taskData)
    })
  })

  describe('getTaskById', () => {
    it('should return a task when it exists', async () => {
      const task = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      vi.spyOn(taskRepository, 'findById').mockResolvedValue(task)

      const result = await taskService.getTaskById('1')

      expect(result).toEqual(task)
    })

    it('should throw AppError when task does not exist', async () => {
      vi.spyOn(taskRepository, 'findById').mockResolvedValue(null)

      await expect(taskService.getTaskById('999')).rejects.toThrow(AppError)
      await expect(taskService.getTaskById('999')).rejects.toThrow('Task not found')
    })
  })

  describe('deleteTask', () => {
    it('should delete a task when it exists', async () => {
      const task = {
        id: '1',
        title: 'Test Task',
        description: 'Test Description',
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }

      vi.spyOn(taskRepository, 'findById').mockResolvedValue(task)
      vi.spyOn(taskRepository, 'delete').mockResolvedValue()

      await taskService.deleteTask('1')

      expect(taskRepository.delete).toHaveBeenCalledWith('1')
    })

    it('should throw AppError when trying to delete non-existent task', async () => {
      vi.spyOn(taskRepository, 'findById').mockResolvedValue(null)

      await expect(taskService.deleteTask('999')).rejects.toThrow(AppError)
    })
  })
})
