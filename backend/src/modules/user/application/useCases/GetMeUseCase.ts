import type { UseCase } from '../../../../shared/domain/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { UserResponse } from '../dtos/UserResponse';
import { UserMapper } from '../dtos/UserMapper';
import { NotFoundError } from '../../../../shared/domain/errors/DomainError';

/**
 * SRP: Fetches the currently authenticated user by their token subject (id).
 */
export class GetMeUseCase implements UseCase<string, UserResponse> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError('User', id);
    return UserMapper.toResponse(user);
  }
}