import { ValidationError } from '../../../../shared/errors/DomainError';

/**
 * Value Object: Enforces domain rule — title cannot be empty.
 * Immutable after creation.
 */
export class TodoTitle {
  private static readonly MIN_LENGTH = 1;
  private static readonly MAX_LENGTH = 255;

  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(raw: string): TodoTitle {
    const trimmed = raw?.trim();

    if (!trimmed || trimmed.length < TodoTitle.MIN_LENGTH) {
      throw new ValidationError('Todo title cannot be empty');
    }

    if (trimmed.length > TodoTitle.MAX_LENGTH) {
      throw new ValidationError(
        `Todo title cannot exceed ${TodoTitle.MAX_LENGTH} characters`,
      );
    }

    return new TodoTitle(trimmed);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: TodoTitle): boolean {
    return this.value === other.value;
  }
}