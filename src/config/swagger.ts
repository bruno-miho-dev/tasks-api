import swaggerJsdoc from 'swagger-jsdoc'
import { env } from './env'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API',
      version: '2.2.0',
      description:
        'API RESTful para gerenciamento de tarefas com TypeScript, Express, Prisma e PostgreSQL',
      contact: {
        name: 'Bruno Miho',
        email: 'seu-email@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
    tags: [
      {
        name: 'Tasks',
        description: 'Endpoints para gerenciamento de tarefas',
      },
      {
        name: 'Health',
        description: 'Endpoints de saúde da aplicação',
      },
    ],
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da tarefa',
            },
            title: {
              type: 'string',
              description: 'Título da tarefa',
              maxLength: 255,
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada da tarefa',
              maxLength: 1000,
            },
            completed_at: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Data de conclusão da tarefa',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação da tarefa',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
            },
          },
        },
        CreateTask: {
          type: 'object',
          required: ['title', 'description'],
          properties: {
            title: {
              type: 'string',
              description: 'Título da tarefa',
              minLength: 1,
              maxLength: 255,
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada da tarefa',
              minLength: 1,
              maxLength: 1000,
            },
          },
        },
        UpdateTask: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Título da tarefa',
              minLength: 1,
              maxLength: 255,
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada da tarefa',
              minLength: 1,
              maxLength: 1000,
            },
          },
        },
        PaginatedTasks: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Task',
              },
            },
            pagination: {
              type: 'object',
              properties: {
                page: {
                  type: 'integer',
                  description: 'Página atual',
                },
                limit: {
                  type: 'integer',
                  description: 'Itens por página',
                },
                total: {
                  type: 'integer',
                  description: 'Total de itens',
                },
                totalPages: {
                  type: 'integer',
                  description: 'Total de páginas',
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              description: 'Mensagem de erro',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                  },
                  message: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
