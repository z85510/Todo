"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_1 = require("../../shared/entities/user");
const bcrypt_1 = require("../../shared/utils/bcrypt");
const profile_1 = require("../entities/profile");
let UsersService = class UsersService {
    constructor(userRepository, profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }
    findAllUsers() {
        return this.userRepository.find({
            select: ['id', 'username', 'createdAt', 'updatedAt'],
        });
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({
            where: { username: username },
        });
        if (!user || username == undefined || !username) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        return user;
    }
    async findById(userId) {
        const user = await this.userRepository.findOneBy({
            id: userId,
        });
        if (!user || userId == undefined || !userId) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        delete user.password;
        return user;
    }
    async createUser(userDetails) {
        try {
            const hashedPassword = (0, bcrypt_1.encodePassword)(userDetails.password);
            const newUser = this.userRepository.create(Object.assign(Object.assign({}, userDetails), { password: hashedPassword, createdAt: new Date(), updatedAt: new Date() }));
            const createdUser = await this.userRepository.save(newUser);
            return createdUser;
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new common_1.HttpException('Username already exists', common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async updateUserById(userId, userDetails) {
        const user = await this.findById(userId);
        const hashedPassword = (0, bcrypt_1.encodePassword)(userDetails.password);
        user.username = userDetails.username;
        user.password = hashedPassword;
        user.updatedAt = new Date();
        const updatedUser = await this.userRepository.save(user);
        const userProfile = {
            id: updatedUser.id,
            username: updatedUser.username,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        };
        return userProfile;
    }
    async updateRefreshToken(userId, token) {
        const user = await this.findById(userId);
        user.refreshToken = token;
        user.updatedAt = new Date();
        const updatedUser = await this.userRepository.save(user);
        const userProfile = {
            id: updatedUser.id,
            username: updatedUser.username,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        };
        return Object.assign(Object.assign({}, userProfile), { refreshToken: token });
    }
    async logout(userId) {
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
            message: 'Goodbye ' +
                user.username +
                ', Time to log out and live your best life!\nSee you next time!',
        };
    }
    async deleteUser(userId) {
        const user = await this.findById(userId);
        return this.userRepository.delete(user);
    }
    async createProfile(userId, profileDetail) {
        const user = await this.findById(userId);
        const newProfile = this.profileRepository.create(profileDetail);
        const savedProfile = await this.profileRepository.save(newProfile);
        user.profile = savedProfile;
        return this.userRepository.save(user);
    }
    async getUserProfile(userId) {
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
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(profile_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map