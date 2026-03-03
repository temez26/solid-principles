import { ValidationError } from '../../../../shared/domain/errors/DomainError';

export class Username {
  private static readonly MIN = 3;
  private static readonly MAX = 100;
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(raw: string): Username {
    const trimmed = raw?.trim();
    if (!trimmed || trimmed.length < Username.MIN) {
      throw new ValidationError(`Username must be at least ${Username.MIN} characters`);
    }
    if (trimmed.length > Username.MAX) {
      throw new ValidationError(`Username cannot exceed ${Username.MAX} characters`);
    }
    return new Username(trimmed);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Username): boolean {
    return this.value === other.value;
  }
}