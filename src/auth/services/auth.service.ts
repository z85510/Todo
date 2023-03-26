import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../../shared/constants';
import { User } from '../../shared/entities/user';
import { comparePassword, encodePassword } from '../../shared/utils/bcrypt';
import { CreateUserParams, Tokens } from '../../shared/utils/types';
import { UsersService } from '../../user/services/users.service';
import { AuthDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedException(`Invalid credentials!`);
    }

    return user;
  }

  async signUp(userParams: CreateUserParams): Promise<Tokens> {
    const user = await this.usersService.createUser(userParams);
    if (!user) {
      throw new BadRequestException('Something wrong!');
    }
    const tokens = await this.getToken(user.id, user.username);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async loginWithCredentials(user: AuthDto) {
    const logginedUser = await this.validateUserCredentials(
      user.username,
      user.password,
    );

    if (!logginedUser) {
      throw new ForbiddenException(`Invalid credentials!`);
    }

    const tokens = await this.getToken(logginedUser.id, user.username);
    await this.updateRefreshToken(logginedUser.id, tokens.refresh_token);
    delete logginedUser.password;
    delete logginedUser.refreshToken;
    delete logginedUser.todos;
    delete logginedUser.profile;

    return { ...logginedUser, ...tokens };
  }

  logOut(userId: number) {
    return this.usersService.logout(userId);
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    const tokens = await this.getToken(user.id, user.username);

    if (!comparePassword(refreshToken, user.refreshToken)) {
      throw new ForbiddenException(`Invalid credentials!`);
    }

    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async getToken(userId: number, username: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, username },
        { secret: jwtConstants.accessKey, expiresIn: 60 * 15 },
      ),
      this.jwtService.signAsync(
        { sub: userId, username },
        { secret: jwtConstants.refreshKey, expiresIn: 60 * 15 * 24 * 7 },
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = encodePassword(refreshToken);
    await this.usersService.updateRefreshToken(userId, hash);
  }
}
