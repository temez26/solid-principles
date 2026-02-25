import type { UseCase } from '../../../../shared/domain/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { UserResponse } from '../dtos/UserResponse';
import { UserMapper } from '../dtos/UserMapper';
import { NotFoundError, InvalidIdError } from '../../../../shared/domain/errors/DomainError';
import { UniqueId } from '../../../../shared/domain/valueObjects/UniqueId';

export class GetUserUseCase implements UseCase<string, UserResponse> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserResponse> {
    if (!UniqueId.isValid(id)) {
      throw new InvalidIdError(id);
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User', id);
    }

    return UserMapper.toResponse(user);
  }
}