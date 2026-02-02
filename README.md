# 📝 Tasks API

API RESTful para gerenciamento completo de tarefas (CRUD) desenvolvida em Node.js puro, sem frameworks. O projeto inclui funcionalidade de importação em massa de tarefas via arquivo CSV.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **csv-parse** - Biblioteca para parsing de arquivos CSV
- **HTTP nativo** - Sem frameworks (Express, Fastify, etc)
- **File System (fs)** - Persistência de dados em JSON

## 📋 Funcionalidades

- ✅ Criar nova tarefa
- ✅ Listar todas as tarefas
- ✅ Buscar tarefas por título ou descrição
- ✅ Atualizar tarefa existente
- ✅ Remover tarefa
- ✅ Marcar tarefa como concluída/pendente
- ✅ Importação em massa via CSV

## 🗂️ Estrutura do Projeto

```
tasks-api/
├── src/
│   ├── server.js                 # Servidor HTTP
│   ├── routes.js                 # Definição das rotas
│   ├── database.js               # Camada de persistência
│   ├── middlewares/
│   │   └── json.js              # Middleware para parsing JSON
│   └── utils/
│       ├── build-route-path.js  # Construtor de rotas dinâmicas
│       └── extract-query-params.js # Extrator de query strings
├── import-csv.js                 # Script de importação CSV
├── tasks.csv                     # Arquivo CSV de exemplo
├── db.json                       # Banco de dados (gerado automaticamente)
└── package.json
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd tasks-api
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`

## 📚 Documentação da API

### Estrutura de uma Tarefa

```json
{
  "id": "uuid",
  "title": "Título da tarefa",
  "description": "Descrição detalhada",
  "completed_at": null,
  "created_at": "2026-02-02T19:30:00.000Z",
  "updated_at": "2026-02-02T19:30:00.000Z"
}
```

### Endpoints

#### Criar Tarefa
```http
POST /tasks
Content-Type: application/json

{
  "title": "Minha nova tarefa",
  "description": "Descrição da tarefa"
}
```

**Resposta:** `201 Created`

**Validações:**
- `title` é obrigatório
- `description` é obrigatório

---

#### Listar Tarefas
```http
GET /tasks
```

**Resposta:** `200 OK`
```json
[
  {
    "id": "1",
    "title": "Tarefa 1",
    "description": "Descrição",
    "completed_at": null,
    "created_at": "2026-02-02T19:30:00.000Z",
    "updated_at": "2026-02-02T19:30:00.000Z"
  }
]
```

---

#### Buscar Tarefas
```http
GET /tasks?search=palavra-chave
```

Busca por `title` ou `description` que contenham a palavra-chave.

**Resposta:** `200 OK`

---

#### Atualizar Tarefa
```http
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Título atualizado",
  "description": "Descrição atualizada"
}
```

**Resposta:** `204 No Content`

**Validações:**
- Pelo menos um campo (`title` ou `description`) é obrigatório
- O `id` deve existir

---

#### Remover Tarefa
```http
DELETE /tasks/:id
```

**Resposta:** `204 No Content`

**Validações:**
- O `id` deve existir

---

#### Marcar como Concluída/Pendente
```http
PATCH /tasks/:id/complete
```

Alterna o status entre concluída e pendente.

**Resposta:** `204 No Content`

**Validações:**
- O `id` deve existir

---

## 📥 Importação via CSV

### Formato do Arquivo CSV

Crie um arquivo `tasks.csv` no formato:

```csv
title,description
Tarefa 01,Descrição da tarefa 01
Tarefa 02,Descrição da tarefa 02
Tarefa 03,Descrição da tarefa 03
```

### Executar Importação

1. Certifique-se de que o servidor está rodando
2. Execute o script de importação:

```bash
node import-csv.js
```

O script irá:
- Ler o arquivo `tasks.csv`
- Fazer uma requisição POST para cada linha
- Exibir o progresso no console

## 🧪 Testando a API

### Usando cURL

**Criar tarefa:**
```bash
curl -X POST http://localhost:3333/tasks   -H "Content-Type: application/json"   -d '{"title":"Estudar Node.js","description":"Revisar conceitos de streams"}'
```

**Listar tarefas:**
```bash
curl http://localhost:3333/tasks
```

**Buscar tarefas:**
```bash
curl http://localhost:3333/tasks?search=Node
```

**Atualizar tarefa:**
```bash
curl -X PUT http://localhost:3333/tasks/ID_DA_TAREFA   -H "Content-Type: application/json"   -d '{"title":"Título atualizado"}'
```

**Marcar como concluída:**
```bash
curl -X PATCH http://localhost:3333/tasks/ID_DA_TAREFA/complete
```

**Deletar tarefa:**
```bash
curl -X DELETE http://localhost:3333/tasks/ID_DA_TAREFA
```

### Usando Insomnia ou Postman

Importe a coleção ou crie as requisições manualmente seguindo a documentação acima.

## 🎯 Conceitos Aplicados

- **HTTP nativo do Node.js** - Criação de servidor sem frameworks
- **Streams** - Processamento eficiente de dados
- **Regex** - Rotas dinâmicas com parâmetros
- **REST API** - Métodos HTTP corretos e status codes apropriados
- **Validações** - Verificação de dados e recursos
- **Persistência** - Salvamento em arquivo JSON
- **Async/Await** - Operações assíncronas
- **CSV Parsing** - Leitura e processamento de arquivos CSV

## 📝 Scripts Disponíveis

```json
{
  "dev": "node --watch src/server.js"
}
```

- `npm run dev` - Inicia o servidor em modo watch (reinicia automaticamente)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido por **Bruno Miho** - Full Stack Developer

---

⭐ Se este projeto te ajudou, considere dar uma estrela!
