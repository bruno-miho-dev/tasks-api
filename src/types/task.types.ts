export interface Task {
  id: string
  title: string
  description: string
  completed_at: Date | null
  created_at: Date
  updated_at: Date
}

export interface CreateTaskDTO {
  title: string
  description: string
}

export interface UpdateTaskDTO {
  title?: string
  description?: string
}

export interface TaskFilters {
  search?: string
  completed?: boolean
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
