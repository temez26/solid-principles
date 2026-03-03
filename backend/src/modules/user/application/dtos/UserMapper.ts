import type { User } from '../../domain/entities/User';
import type { UserResponse } from './UserResponse';

export class UserMapper {
    static toResponse(user: User): UserResponse {
        return {
            id:         user.id.toString(),
            username:   user.username,
            email:      user.email,
            createdAt:  user.createdAt.toISOString(),
            updatedAt:  user.updatedAt.toISOString()
        };
    }
}