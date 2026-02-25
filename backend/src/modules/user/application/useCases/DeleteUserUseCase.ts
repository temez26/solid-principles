import type { UseCase } from '../../../../shared/domain/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import { NotFoundError, InvalidIdError } from '../../../../shared/domain/errors/DomainError';
import { UniqueId } from '../../../../shared/domain/valueObjects/UniqueId';

export class DeleteUserUseCase implements UseCase<string, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    if (!UniqueId.isValid(id)) {
      throw new InvalidIdError(id);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User', id);
    }

    await this.userRepository.delete(id);
  }
}