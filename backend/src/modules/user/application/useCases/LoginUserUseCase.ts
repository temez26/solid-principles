import type { UseCase } from '../../../../shared/application/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { IPasswordHasher } from '../../../../shared/domain/services/IPasswordHasher';
import type { IJwtService } from '../../../../shared/domain/services/IJwtService';
import type { LoginUserDTO } from '../dtos/UserDTOs';
import type { AuthResponse } from '../dtos/UserResponse';
import { UserMapper } from '../dtos/UserMapper';
import { ValidationError } from '../../../../shared/domain/errors/DomainError';

export class LoginUserUseCase implements UseCase<LoginUserDTO, AuthResponse> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(dto: LoginUserDTO): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new ValidationError('Invalid email or password');

    const isValid = await this.passwordHasher.compare(dto.password, user.passwordHash);
    if (!isValid) throw new ValidationError('Invalid email or password');

    const token = this.jwtService.sign({
      sub: user.id.toString(),
      email: user.email,
      username: user.username,
    });

    return { token, user: UserMapper.toResponse(user) };
  }
}