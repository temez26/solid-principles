import type { UseCase } from '../../../../shared/domain/UseCase';
import type { UserRepository } from '../../domain/repositories/UserRepository';
import type { IPasswordHasher } from '../../../../shared/domain/services/IPasswordHasher';
import type { IJwtService } from '../../../../shared/domain/services/IJwtService';
import type { UserDTO } from '../dtos/UserDTO';
import type { LoginResponse } from '../dtos/LoginResponse';
import { UserMapper } from '../dtos/UserMapper';
import { NotFoundError, ValidationError } from '../../../../shared/domain/errors/DomainError';

export class LoginUserUseCase implements UseCase<UserDTO, LoginResponse> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(dto: UserDTO): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new ValidationError('Invalid email or password');

    const isValid = await this.passwordHasher.compare(dto.password, user.passwordHash);
    if (!isValid) throw new ValidationError('Invalid email or password');

    const token = this.jwtService.sign({
      sub: user.id.toString(),
      email: user.email,
      username: user.username,
    });

    return {
      token,
      user: UserMapper.toResponse(user),
    };
  }
}