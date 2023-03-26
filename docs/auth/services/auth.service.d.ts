import { JwtService } from '@nestjs/jwt';
import { User } from '../../shared/entities/user';
import { CreateUserParams, Tokens } from '../../shared/utils/types';
import { UsersService } from '../../user/services/users.service';
import { AuthDto } from '../dtos/auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUserCredentials(username: string, password: string): Promise<User>;
    signUp(userParams: CreateUserParams): Promise<Tokens>;
    loginWithCredentials(user: AuthDto): Promise<{
        access_token: string;
        refresh_token: string;
        id: number;
        username: string;
        password: string;
        refreshToken: string;
        createdAt: Date;
        updatedAt: Date;
        profile: import("../../user/entities/profile").Profile;
        todos: import("../../todo/entities/todo").Todo[];
    }>;
    logOut(userId: number): Promise<{
        message: string;
    }>;
    refreshToken(userId: number, rToken: string): Promise<Tokens>;
    getToken(userId: number, username: string): Promise<Tokens>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
}
