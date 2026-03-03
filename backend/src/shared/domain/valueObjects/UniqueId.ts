import { randomUUID } from 'crypto';

/**
 * Value Object: Immutable unique identifier.
 * No behavior beyond identity generation and equality.
 */
export class UniqueId {
  private readonly value: string;

  private static readonly UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  static isValid(id: string): boolean {
    return UniqueId.UUID_REGEX.test(id);
  }  

  private constructor(value: string) {
    this.value = value;
  }

  public static create(): UniqueId {
    return new UniqueId(randomUUID());
  }

  public static fromString(id: string): UniqueId {
    return new UniqueId(id);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: UniqueId): boolean {
    return this.value === other.value;
  }
}