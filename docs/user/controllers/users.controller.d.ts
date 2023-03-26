import { Profile } from '../entities/profile';
import { UpdateUserDto } from '../dtos/update_user.dto';
import { UsersService } from '../services/users.service';
import { User } from '../../shared/entities/user';
import { CreateProfileDto } from '../dtos/create_profile.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findUsers(): Promise<User[]>;
    findUser(id: number): Promise<User>;
    getCurrent(user: any): Promise<User>;
    updateUserById(user: any, userDetails: UpdateUserDto): Promise<import("../interfaces/user.interface").IUser>;
    deleteUser(user: any): Promise<import("typeorm").DeleteResult>;
    createUserProfile(user: any, userProfileDetail: CreateProfileDto): Promise<User>;
    getUserProfile(user: any): Promise<Profile>;
}
