import { UniqueId } from '../valueObjects/UniqueId';
import { TodoTitle } from '../valueObjects/TodoTitle';
import { TodoStatus } from '../valueObjects/TodoStatus';

/**
 * Entity: Has unique identity and lifecycle.
 * Encapsulates all domain behavior for a Todo.
 */
export class Todo {
  private readonly id: UniqueId;
  private title: TodoTitle;
  private status: TodoStatus;
  private readonly createdAt: Date;

  private constructor(
    id: UniqueId,
    title: TodoTitle,
    status: TodoStatus,
    createdAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.createdAt = createdAt;
  }

  /** Factory: create a brand-new Todo */
  public static create(rawTitle: string): Todo {
    return new Todo(
      UniqueId.create(),
      TodoTitle.create(rawTitle),
      TodoStatus.active(),
      new Date(),
    );
  }

  /** Factory: reconstitute from persistence */
  public static reconstitute(
    id: string,
    title: string,
    completed: boolean,
    createdAt: Date,
  ): Todo {
    return new Todo(
      UniqueId.fromString(id),
      TodoTitle.create(title),
      TodoStatus.fromBoolean(completed),
      createdAt,
    );
  }

  public toggleStatus(): void {
    this.status = this.status.toggle();
  }

  public getId(): string {
    return this.id.toString();
  }

  public getTitle(): string {
    return this.title.toString();
  }

  public isCompleted(): boolean {
    return this.status.isCompleted();
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}