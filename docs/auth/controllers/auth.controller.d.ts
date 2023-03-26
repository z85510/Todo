import { Tokens } from '../../shared/utils/types';
import { AuthDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(userInfo: AuthDto): Promise<Tokens>;
    login(userInfo: AuthDto): Promise<{
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
    refreshToken(userId: any, refreshToken: string): Promise<Tokens>;
    logout(userId: any): Promise<{
        message: string;
    }>;
}
