import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info, context, status) {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    if (err || !user) {
      if (!username) {
        throw new HttpException(
          {
            message: 'Username cannot be blank ',
          },
          HttpStatus.OK,
        );
      } else if (!password) {
        throw new HttpException(
          {
            message: 'Password cannot be blank',
          },
          HttpStatus.OK,
        );
      } else {
        throw err || new UnauthorizedException();
      }
    }

    return user;
  }
}
