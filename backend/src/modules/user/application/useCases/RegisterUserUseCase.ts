import type { UseCase } from '../../../../shared/domain/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { IPasswordHasher } from '../../../../shared/domain/services/IPasswordHasher';
import type { RegisterUserDTO } from '../dtos/UserDTOs';
import type { UserResponse } from '../dtos/UserResponse';
import { UserMapper } from '../dtos/UserMapper';
import { User } from '../../domain/entities/User';
import { ConflictError } from '../../../../shared/domain/errors/DomainError';

export class RegisterUserUseCase implements UseCase<RegisterUserDTO, UserResponse> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: RegisterUserDTO): Promise<UserResponse> {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) throw new ConflictError('Email already in use');

    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) throw new ConflictError('Username already in use');

    const passwordHash = await this.passwordHasher.hash(dto.password);
    const user = User.create(dto.username, dto.email, passwordHash);
    await this.userRepository.save(user);

    return UserMapper.toResponse(user);
  }
}