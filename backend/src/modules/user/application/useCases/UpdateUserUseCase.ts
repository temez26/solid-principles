import type { UseCase } from '../../../../shared/domain/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { IPasswordHasher } from '../../../../shared/domain/services/IPasswordHasher';
import type { UserDTO } from '../dtos/UserDTO';
import type { UserResponse } from '../dtos/UserResponse';
import { UserMapper } from '../dtos/UserMapper';
import { NotFoundError, InvalidIdError, ConflictError } from '../../../../shared/domain/errors/DomainError';
import { UniqueId } from '../../../../shared/domain/valueObjects/UniqueId';

export class UpdateUserUseCase implements UseCase<UserDTO, UserResponse> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: UserDTO): Promise<UserResponse> {
    if (!UniqueId.isValid(dto.id)) {
      throw new InvalidIdError(dto.id);
    }

    const user = await this.userRepository.findById(dto.id);
    if (!user) {
      throw new NotFoundError('User', dto.id);
    }

    if (dto.email && dto.email !== user.email) {
      const existingEmail = await this.userRepository.findByEmail(dto.email);
      if (existingEmail) {
        throw new ConflictError('Email already in use');
      }
    }

    if (dto.username && dto.username !== user.username) {
      const existingUsername = await this.userRepository.findByUsername(dto.username);
      if (existingUsername) {
        throw new ConflictError('Username already in use');
      }
    }

    const passwordHash = dto.password
      ? await this.passwordHasher.hash(dto.password)
      : user.passwordHash;

    const updatedUser = user.update(
      dto.username ?? user.username,
      dto.email ?? user.email,
      passwordHash,
    );

    await this.userRepository.update(updatedUser);

    return UserMapper.toResponse(updatedUser);
  }
}