import type { UseCase } from '../../../../shared/domain/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { IPasswordHasher } from '../../../../shared/domain/services/IPasswordHasher';
import type { LoginUserDTO } from '../dtos/UserDTOs';
import type { UserResponse } from '../dtos/UserResponse';
import { UserMapper } from '../dtos/UserMapper';
import { ValidationError } from '../../../../shared/domain/errors/DomainError';

export class LoginUserUseCase implements UseCase<LoginUserDTO, UserResponse> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async execute(dto: LoginUserDTO): Promise<UserResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new ValidationError('Invalid email or password');

    const isValid = await this.passwordHasher.compare(dto.password, user.passwordHash);
    if (!isValid) throw new ValidationError('Invalid email or password');

    return UserMapper.toResponse(user);
  }
}