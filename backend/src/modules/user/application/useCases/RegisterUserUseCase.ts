import type { UseCase } from '../../../../shared/domain/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { IPasswordHasher } from '../../../../shared/domain/services/IPasswordHasher';
import type { IJwtService } from '../../../../shared/domain/services/IJwtService';
import type { RegisterUserDTO } from '../dtos/UserDTOs';
import type { RegisterResponse } from '../dtos/UserResponse';
import { UserMapper } from '../dtos/UserMapper';
import { User } from '../../domain/entities/User';
import { ConflictError } from '../../../../shared/domain/errors/DomainError';

export class RegisterUserUseCase implements UseCase<RegisterUserDTO, RegisterResponse> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(dto: RegisterUserDTO): Promise<RegisterResponse> {
    const existingEmail = await this.userRepository.findByEmail(dto.email);
    if (existingEmail) throw new ConflictError('Email already in use');

    const existingUsername = await this.userRepository.findByUsername(dto.username);
    if (existingUsername) throw new ConflictError('Username already in use');

    const passwordHash = await this.passwordHasher.hash(dto.password);
    const user = User.create(dto.username, dto.email, passwordHash);
    await this.userRepository.save(user);

    const token = this.jwtService.sign({
      sub:      user.id.toString(),
      email:    user.email,
      username: user.username,
    });

    return {
      token,
      user: UserMapper.toResponse(user),
    };
  }
}