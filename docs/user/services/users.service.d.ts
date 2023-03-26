import { CreateUserParams, UpdateUserParams } from 'src/shared/utils/types';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user';
import { CreateProfileDto } from '../dtos/create_profile.dto';
import { Profile } from '../entities/profile';
import { IUser } from '../interfaces/user.interface';
export declare class UsersService {
    private userRepository;
    private profileRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<Profile>);
    findAllUsers(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    findById(userId: number): Promise<User>;
    createUser(userDetails: CreateUserParams): Promise<IUser>;
    updateUserById(userId: number, userDetails: UpdateUserParams): Promise<IUser>;
    updateRefreshToken(userId: number, token: string): Promise<{
        refreshToken: string;
        id: number;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        profile?: Profile;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
    deleteUser(userId: number): Promise<import("typeorm").DeleteResult>;
    createProfile(userId: number, profileDetail: CreateProfileDto): Promise<User>;
    getUserProfile(userId: number): Promise<Profile>;
}
