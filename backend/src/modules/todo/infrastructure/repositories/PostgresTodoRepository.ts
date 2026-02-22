import type { Pool } from 'pg';
import type { TodoRepository } from '../../domain/repositories/TodoRepository';
import { Todo } from '../../domain/entities/Todo';

export class PostgresTodoRepository implements TodoRepository {
  constructor(private readonly pool: Pool) {}

  async findAll(): Promise<Todo[]> {
    const { rows } = await this.pool.query(
      'SELECT id, title, completed, created_at FROM todos ORDER BY created_at DESC',
    );
    return rows.map((row) =>
      Todo.reconstitute(row.id, row.title, row.completed, row.created_at),
    );
  }

  async findById(id: string): Promise<Todo | null> {
    const { rows } = await this.pool.query(
      'SELECT id, title, completed, created_at FROM todos WHERE id = $1',
      [id],
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return Todo.reconstitute(row.id, row.title, row.completed, row.created_at);
  }

  async save(todo: Todo): Promise<void> {
    await this.pool.query(
      `INSERT INTO todos (id, title, completed, created_at)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET title = $2, completed = $3`,
      [todo.getId(), todo.getTitle(), todo.isCompleted(), todo.getCreatedAt()],
    );
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM todos WHERE id = $1', [id]);
  }
}