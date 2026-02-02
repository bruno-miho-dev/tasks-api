import { randomUUID } from "node:crypto";
import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      // Recupera os dados {title e description}
      const { title, description } = req.body;

      // Valida se title existe.
      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "Título é obrigatório!" }));
      }

      // Valida se description existe.
      if (!description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "Descrição é obrigatória!" }));
      }

      // Cria o objeto task.
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Insere no banco de dados na tabela "tasks" o item "task"
      database.insert("tasks", task);

      // Retorna o status code 201 - Created
      return res.writeHead(201).end();
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null,
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ message: "Título e descrição são obrigatórios." }),
          );
      }

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: "Task não encontrada" }));
      }

      database.update("tasks", id, {
        title: title ?? task.title,
        description: description ?? task.description,
        completed_at: task.completed_at,
        created_at: task.created_at,
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: "Task não encontrada" }));
      }

      database.delete("tasks", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: "Task não encontrada" }));
      }

      const isTaskCompleted = !!task.completed_at;
      const completed_at = isTaskCompleted ? null : new Date();

      database.update("tasks", id, {
        title: task.title,
        description: task.description,
        completed_at,
        created_at: task.created_at,
        updated_at: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
];
