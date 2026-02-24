import type { Pool } from 'pg';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { User as UserEntity } from '../../domain/entities/User';
import { User } from '../../domain/entities/User';
import { UniqueId } from '../../../../shared/domain/valueObjects/UniqueId';

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly pool: Pool) {}

  async save(user: UserEntity): Promise<void> {
    await this.pool.query(
      `INSERT INTO users (id, username, email, password_hash, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        user.id.toString(),
        user.username,
        user.email,
        user.passwordHash,
        user.createdAt,
        user.updatedAt,
      ],
    );
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email],
    );
    return result.rows[0] ? this.toEntity(result.rows[0]) : null;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE username = $1 LIMIT 1',
      [username],
    );
    return result.rows[0] ? this.toEntity(result.rows[0]) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const result = await this.pool.query(
      'SELECT * FROM users WHERE id = $1 LIMIT 1',
      [id],
    );
    return result.rows[0] ? this.toEntity(result.rows[0]) : null;
  }

  async update(user: UserEntity): Promise<void> {
    await this.pool.query(
      `UPDATE users SET username = $1, email = $2, password_hash = $3, updated_at = $4
       WHERE id = $5`,
      [user.username, user.email, user.passwordHash, user.updatedAt, user.id.toString()],
    );
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM users WHERE id = $1', [id]);
  }

  private toEntity(row: Record<string, unknown>): UserEntity {
    return User.reconstitute({
      id:           UniqueId.fromString(row.id as string),
      username:     row.username as string,
      email:        row.email as string,
      passwordHash: row.password_hash as string,
      createdAt:    new Date(row.created_at as string),
      updatedAt:    new Date(row.updated_at as string),
    });
  }
}