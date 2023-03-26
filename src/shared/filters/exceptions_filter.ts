import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpAdapterHost,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    let statusCode: number;
    let message: string;

    switch (true) {
      case error instanceof NotFoundException:
        statusCode = 404;
        message = error.message;
        break;
      case error instanceof UnauthorizedException:
        statusCode = 401;
        message = 'Access Denied!, ' + error.message;
        break;
      case error instanceof ForbiddenException:
        statusCode = 503;
        message = 'Hmmmm!, ' + error.message;
        break;
      default:
        statusCode = 400;
        message = error.message;
        break;
    }

    const responseBody = {
      statusCode: statusCode,
      message: message,
      details: '',
    };

    if (error && error['response'] && error['response']['message']) {
      responseBody.details = error['response']['message'];
    } else {
      delete responseBody.details;
    }

    response.status(statusCode).json(responseBody);
  }
}
