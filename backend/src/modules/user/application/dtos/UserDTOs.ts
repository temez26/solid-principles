export interface RegisterUserDTO {
    username: string;
    email: string;
    password: string;
}

export interface LoginUserDTO {
    email: string;
    password: string;
}

export interface UpdateUserDTO {
    id: string;
    username?: string;
    email?: string;
    password?: string;
}