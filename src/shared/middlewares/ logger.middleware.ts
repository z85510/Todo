import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //todo --> in case you need to log endpoints
    // console.log(
    //   `request: ${req.method} ${req.originalUrl} ${new Date().toISOString()}`,
    // );
    next();
  }
}
