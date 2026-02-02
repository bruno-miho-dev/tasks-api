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

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
taskRoutes.post('/', validate(createTaskSchema, 'body'), taskController.createTask)

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Lista todas as tarefas com paginação
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por título ou descrição
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Filtrar por status (true=concluídas, false=pendentes)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           maximum: 100
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de tarefas com paginação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedTasks'
 */
taskRoutes.get('/', validate(taskQuerySchema, 'query'), taskController.listTasks)

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Busca uma tarefa por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
taskRoutes.get('/:id', validate(taskIdSchema, 'params'), taskController.getTask)

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTask'
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Erro de validação
 *       404:
 *         description: Tarefa não encontrada
 */
taskRoutes.put(
  '/:id',
  validate(taskIdSchema, 'params'),
  validate(updateTaskSchema, 'body'),
  taskController.updateTask
)

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa removida com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
taskRoutes.delete('/:id', validate(taskIdSchema, 'params'), taskController.deleteTask)

/**
 * @swagger
 * /api/tasks/{id}/complete:
 *   patch:
 *     summary: Alterna o status de conclusão da tarefa
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 */
taskRoutes.patch('/:id/complete', validate(taskIdSchema, 'params'), taskController.toggleComplete)
