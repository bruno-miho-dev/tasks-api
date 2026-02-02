# 📝 Tasks API

API RESTful completa para gerenciamento de tarefas desenvolvida com **TypeScript**, **Express**, **Prisma ORM** e **PostgreSQL**. Inclui validação robusta, testes automatizados, paginação, documentação interativa e recursos de segurança.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)](https://www.postgresql.org/)

## 🚀 Tecnologias

### Core
- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express** - Framework web minimalista
- **Prisma ORM** - ORM moderno para TypeScript
- **PostgreSQL** - Banco de dados relacional

### Validação e Testes
- **Zod** - Validação de schemas com type inference
- **Vitest** - Framework de testes ultrarrápido
- **Supertest** - Testes de integração HTTP

### Segurança e Performance
- **Helmet** - Segurança com headers HTTP
- **CORS** - Cross-Origin Resource Sharing
- **Express Rate Limit** - Proteção contra rate limiting

### Documentação
- **Swagger/OpenAPI** - Documentação interativa da API

### DevOps
- **Docker** - Containerização do PostgreSQL
- **ESLint** - Linter para código TypeScript
- **Prettier** - Formatação de código

---

## 📋 Funcionalidades

- ✅ **CRUD completo** de tarefas
- ✅ **Paginação** e filtros avançados
- ✅ **Busca** por título ou descrição
- ✅ **Filtrar por status** (concluídas/pendentes)
- ✅ **Marcar como concluída/pendente**
- ✅ **Validação robusta** com Zod
- ✅ **Testes automatizados** com Vitest
- ✅ **Documentação interativa** com Swagger
- ✅ **Rate limiting** para proteção
- ✅ **Importação em massa** via CSV
- ✅ **Tratamento global de erros**

---

## 🗂️ Estrutura do Projeto

```
tasks-api/
├── prisma/
│   ├── migrations/           # Migrações do banco de dados
│   └── schema.prisma         # Schema do Prisma
├── src/
│   ├── config/
│   │   ├── database.ts       # Configuração do Prisma Client
│   │   ├── env.ts            # Variáveis de ambiente
│   │   └── swagger.ts        # Configuração do Swagger
│   ├── controllers/
│   │   └── task.controller.ts
│   ├── middlewares/
│   │   ├── error-handler.ts  # Tratamento global de erros
│   │   ├── rate-limit.ts     # Rate limiting
│   │   └── validate.ts       # Validação com Zod
│   ├── repositories/
│   │   └── task.repository.ts
│   ├── routes/
│   │   ├── index.ts
│   │   └── task.routes.ts
│   ├── schemas/
│   │   └── task.schema.ts    # Schemas Zod
│   ├── services/
│   │   └── task.service.ts
│   ├── types/
│   │   └── task.types.ts
│   └── server.ts             # Servidor Express
├── import-csv.js             # Script de importação CSV
├── docker-compose.yml        # PostgreSQL containerizado
├── vitest.config.ts          # Configuração de testes
├── tsconfig.json             # Configuração TypeScript
└── package.json
```

---

## 🔧 Instalação

### Pré-requisitos

- **Node.js** 20+ 
- **Docker** e Docker Compose (ou PostgreSQL instalado)
- **npm** ou **yarn**

### Passo 1: Clone o repositório

```bash
git clone https://github.com/seu-usuario/tasks-api.git
cd tasks-api
```

### Passo 2: Instale as dependências

```bash
npm install
```

### Passo 3: Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Server
PORT=3333
NODE_ENV=development
CORS_ORIGIN=*

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tasks_db?schema=public"
```

### Passo 4: Inicie o PostgreSQL

```bash
docker-compose up -d
```

### Passo 5: Execute as migrações

```bash
npm run prisma:migrate
```

### Passo 6: Inicie o servidor

```bash
npm run dev
```

O servidor estará rodando em:
- 🚀 **API:** http://localhost:3333
- 📚 **Documentação:** http://localhost:3333/api-docs

---

## 📚 Documentação da API

Acesse a documentação interativa completa em:

**http://localhost:3333/api-docs**

### Estrutura de uma Tarefa

```typescript
{
  "id": "uuid",
  "title": "Título da tarefa",
  "description": "Descrição detalhada",
  "completed_at": null | "2026-02-02T20:00:00.000Z",
  "created_at": "2026-02-02T20:00:00.000Z",
  "updated_at": "2026-02-02T20:00:00.000Z"
}
```

---

## 🔌 Endpoints

### Health Check

```http
GET /health
```

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2026-02-02T20:00:00.000Z",
  "environment": "development"
}
```

---

### Criar Tarefa

```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Minha tarefa",
  "description": "Descrição da tarefa"
}
```

**Resposta:** `201 Created`

---

### Listar Tarefas (com paginação)

```http
GET /api/tasks?page=1&limit=10&search=teste&completed=false
```

**Query Parameters:**
- `page` (opcional) - Número da página (padrão: 1)
- `limit` (opcional) - Itens por página (padrão: 10, máx: 100)
- `search` (opcional) - Buscar por título ou descrição
- `completed` (opcional) - Filtrar por status (true/false)

**Resposta:** `200 OK`
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Tarefa 1",
      "description": "Descrição",
      "completed_at": null,
      "created_at": "2026-02-02T20:00:00.000Z",
      "updated_at": "2026-02-02T20:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

---

### Buscar Tarefa por ID

```http
GET /api/tasks/:id
```

**Resposta:** `200 OK`

---

### Atualizar Tarefa

```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Título atualizado",
  "description": "Descrição atualizada"
}
```

**Resposta:** `200 OK`

**Validações:**
- Pelo menos um campo é obrigatório
- O ID deve existir

---

### Remover Tarefa

```http
DELETE /api/tasks/:id
```

**Resposta:** `204 No Content`

---

### Marcar como Concluída/Pendente

```http
PATCH /api/tasks/:id/complete
```

Alterna o status entre concluída e pendente.

**Resposta:** `200 OK`

---

## 📥 Importação via CSV

### Formato do Arquivo CSV

Crie um arquivo `tasks.csv`:

```csv
title,description
Tarefa 01,Descrição da tarefa 01
Tarefa 02,Descrição da tarefa 02
Tarefa 03,Descrição da tarefa 03
```

### Executar Importação

```bash
node import-csv.js
```

---

## 🧪 Testes

### Executar todos os testes

```bash
npm test
```

### Executar com interface visual

```bash
npm run test:ui
```

### Executar com cobertura

```bash
npm run test:coverage
```

### Estrutura de Testes

- ✅ **Testes unitários** - Services, Repositories
- ✅ **Testes de validação** - Schemas Zod
- ✅ **Testes de integração** - Endpoints HTTP

---

## 🔒 Segurança

- ✅ **Helmet** - Proteção de headers HTTP
- ✅ **CORS** - Configuração de origens permitidas
- ✅ **Rate Limiting** - 100 requisições por 15 minutos
- ✅ **Validação de entrada** - Zod schemas
- ✅ **Variáveis de ambiente** - Credenciais protegidas
- ✅ **UUID** - IDs não sequenciais

---

## 📊 Banco de Dados

### Visualizar dados

```bash
npm run prisma:studio
```

Abre interface visual em http://localhost:5555

### Criar nova migration

```bash
npm run prisma:migrate
```

### Resetar banco de dados

```bash
npx prisma migrate reset
```

---

## 🐳 Docker

### Comandos úteis

```bash
# Iniciar PostgreSQL
docker-compose up -d

# Parar
docker-compose down

# Ver logs
docker-compose logs -f postgres

# Resetar dados
docker-compose down -v

# Acessar PostgreSQL
docker-compose exec postgres psql -U postgres -d tasks_db
```

---

## 📝 Scripts Disponíveis

```json
{
  "dev": "Iniciar servidor em modo desenvolvimento",
  "build": "Compilar TypeScript para JavaScript",
  "start": "Iniciar servidor de produção",
  "test": "Executar testes",
  "test:ui": "Executar testes com UI",
  "test:coverage": "Executar testes com cobertura",
  "lint": "Verificar erros de linting",
  "lint:fix": "Corrigir erros de linting",
  "format": "Formatar código com Prettier",
  "prisma:generate": "Gerar Prisma Client",
  "prisma:migrate": "Executar migrações",
  "prisma:studio": "Abrir Prisma Studio"
}
```

---

## 🎯 Conceitos Aplicados

- ✅ **Clean Architecture** - Separação em camadas
- ✅ **Repository Pattern** - Abstração de acesso a dados
- ✅ **Dependency Injection** - Inversão de dependências
- ✅ **DTOs** - Data Transfer Objects
- ✅ **Validation Layer** - Validação em middleware
- ✅ **Error Handling** - Tratamento centralizado
- ✅ **Type Safety** - TypeScript strict mode
- ✅ **Path Aliases** - Imports organizados (@/)

---

## 🚀 Deploy

### Variáveis de ambiente para produção

```env
NODE_ENV=production
PORT=3333
CORS_ORIGIN=https://seu-frontend.com
DATABASE_URL=postgresql://user:password@host:5432/database
```

### Build para produção

```bash
npm run build
npm start
```

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feat/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feat/nova-feature`)
5. Abra um Pull Request

### Padrão de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `test:` Testes
- `refactor:` Refatoração
- `chore:` Tarefas de manutenção

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Autor

**Bruno Miho** - Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black)](https://github.com/seu-usuario)

---

## 🌟 Agradecimentos

Projeto desenvolvido como desafio de aprendizado, aplicando conceitos modernos de desenvolvimento backend com TypeScript e Node.js.

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
