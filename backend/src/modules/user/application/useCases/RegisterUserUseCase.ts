import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { IPasswordHasher } from '../../../../shared/domain/services/IPasswordHasher';
import type { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import type { UserResponse } from '../dtos/UserResponse';
import { UserMapper } from '../dtos/UserMapper';
import { User } from '../../domain/entities/User';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: RegisterUserDTO): Promise<UserResponse> {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new Error('Email already in use');
    }

    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) {
      throw new Error('Username already in use');
    }

    const passwordHash = await this.passwordHasher.hash(dto.password);

    const user = User.create(dto.username, dto.email, passwordHash);

    await this.userRepository.save(user);

    return UserMapper.toResponse(user);
  }
}