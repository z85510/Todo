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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../../shared/constants");
const bcrypt_1 = require("../../shared/utils/bcrypt");
const users_service_1 = require("../../user/services/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUserCredentials(username, password) {
        const user = await this.usersService.findByUsername(username);
        if (!user) {
            throw new common_1.NotFoundException(`User with username ${username} not found`);
        }
        if (!(0, bcrypt_1.comparePassword)(password, user.password)) {
            throw new common_1.UnauthorizedException(`Invalid credentials!`);
        }
        return user;
    }
    async signUp(userParams) {
        const user = await this.usersService.createUser(userParams);
        if (!user) {
            throw new common_1.BadRequestException('Something wrong!');
        }
        const tokens = await this.getToken(user.id, user.username);
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async loginWithCredentials(user) {
        const logginedUser = await this.validateUserCredentials(user.username, user.password);
        if (!logginedUser) {
            throw new common_1.ForbiddenException(`Invalid credentials!`);
        }
        const tokens = await this.getToken(logginedUser.id, user.username);
        await this.updateRefreshToken(logginedUser.id, tokens.refresh_token);
        delete logginedUser.password;
        delete logginedUser.refreshToken;
        delete logginedUser.todos;
        delete logginedUser.profile;
        return Object.assign(Object.assign({}, logginedUser), tokens);
    }
    logOut(userId) {
        return this.usersService.logout(userId);
    }
    async refreshToken(userId, rToken) {
        const user = await this.usersService.findById(userId);
        const tokens = await this.getToken(user.id, user.username);
        if (!(0, bcrypt_1.comparePassword)(rToken['refreshToken'], user.refreshToken)) {
            throw new common_1.ForbiddenException(`Invalid credentials!`);
        }
        await this.updateRefreshToken(user.id, tokens.refresh_token);
        return tokens;
    }
    async getToken(userId, username) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, username }, { secret: constants_1.jwtConstants.accessKey, expiresIn: 60 * 15 }),
            this.jwtService.signAsync({ sub: userId, username }, { secret: constants_1.jwtConstants.refreshKey, expiresIn: 60 * 15 * 24 * 7 }),
        ]);
        return { access_token: at, refresh_token: rt };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hash = (0, bcrypt_1.encodePassword)(refreshToken);
        await this.usersService.updateRefreshToken(userId, hash);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map