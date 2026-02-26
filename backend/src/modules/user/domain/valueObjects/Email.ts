import { ValidationError } from '../../../../shared/domain/errors/DomainError';

export class Email {
  private readonly value: string;
  private static readonly REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(raw: string): Email {
    const trimmed = raw?.trim().toLowerCase();
    if (!trimmed || !Email.REGEX.test(trimmed)) {
      throw new ValidationError(`Invalid email address: "${raw}"`);
    }
    return new Email(trimmed);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
}