import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
} from 'src/shared/utils/types';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user';
import { encodePassword } from '../../shared/utils/bcrypt';
import { CreateProfileDto } from '../dtos/create_profile.dto';
import { Profile } from '../entities/profile';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  findAllUsers() {
    return this.userRepository.find({
      select: ['id', 'username', 'createdAt', 'updatedAt'],
    });
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user || username == undefined || !username) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async findById(userId: number) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user || userId == undefined || !userId) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    delete user.password;
    return user;
  }

  async createUser(userDetails: CreateUserParams) {
    try {
      const hashedPassword = encodePassword(userDetails.password);
      const newUser = this.userRepository.create({
        ...userDetails,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const createdUser: IUser = await this.userRepository.save(newUser);
      return createdUser;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Username already exists', HttpStatus.CONFLICT);
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async updateUserById(userId: number, userDetails: UpdateUserParams) {
    const user = await this.findById(userId);
    const hashedPassword = encodePassword(userDetails.password);
    user.username = userDetails.username;
    user.password = hashedPassword;
    user.updatedAt = new Date();

    const updatedUser = await this.userRepository.save(user);

    const userProfile: IUser = {
      id: updatedUser.id,
      username: updatedUser.username,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return userProfile;
  }

  async updateRefreshToken(userId: number, token: string) {
    const user = await this.findById(userId);

    user.refreshToken = token;
    user.updatedAt = new Date();

    const updatedUser = await this.userRepository.save(user);
    const userProfile: IUser = {
      id: updatedUser.id,
      username: updatedUser.username,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };

    return { ...userProfile, refreshToken: token };
  }

  async logout(userId: number) {
    const user = await this.findById(userId);

    if (user.refreshToken == '' || user.refreshToken == null) {
      return {
        message: "You've already signed out!",
      };
    }

    user.refreshToken = null;
    user.updatedAt = new Date();

    await this.userRepository.save(user);

    return {
      message:
        'Goodbye ' +
        user.username +
        ', Time to log out and live your best life!\nSee you next time!',
    };
  }

  async deleteUser(userId: number) {
    const user = await this.findById(userId);

    return this.userRepository.delete(user);
  }

  async createProfile(userId: number, profileDetail: CreateProfileDto) {
    const user = await this.findById(userId);

    const newProfile = this.profileRepository.create(profileDetail);
    const savedProfile = await this.profileRepository.save(newProfile);

    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async getUserProfile(userId: number) {
    const profiles = await this.profileRepository.findOne({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        birthDate: true,
      },
    });
    return profiles;
  }
}
