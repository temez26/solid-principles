export class DomainError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = 'DomainError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export class NotFoundError extends DomainError {
  constructor(entity: string, id: string) {
    super(`${entity} with id "${id}" not found`, 404);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, 422);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class InvalidIdError extends DomainError {
  constructor(id: string) {
    super(`Invalid id format: "${id}"`, 400);
    this.name = 'InvalidIdError';
    Object.setPrototypeOf(this, InvalidIdError.prototype);
  }
}

export class ConflictError extends DomainError {
  constructor(message: string) {
    super(message, 409);
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}