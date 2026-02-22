/**
 * Value Object: Encapsulates completion status with toggle behavior.
 * Immutable — toggling returns a new instance.
 */
export class TodoStatus {
  private readonly completed: boolean;

  private constructor(completed: boolean) {
    this.completed = completed;
  }

  public static active(): TodoStatus {
    return new TodoStatus(false);
  }

  public static completed(): TodoStatus {
    return new TodoStatus(true);
  }

  public static fromBoolean(value: boolean): TodoStatus {
    return new TodoStatus(value);
  }

  public toggle(): TodoStatus {
    return new TodoStatus(!this.completed);
  }

  public isCompleted(): boolean {
    return this.completed;
  }

  public equals(other: TodoStatus): boolean {
    return this.completed === other.completed;
  }
}