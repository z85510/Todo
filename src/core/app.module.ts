import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/strategies/jwt_auth.guard';
import { User } from '../shared/entities/user';
import { CustomExceptionFilter } from '../shared/filters/exceptions_filter';
import { LoggerMiddleware } from '../shared/middlewares/ logger.middleware';
import { TypeORMConfig } from '../shared/utils/typeorm_module';
import { Task } from '../todo/entities/task';
import { Todo } from '../todo/entities/todo';
import { TodoModule } from '../todo/todo.module';
import { Profile } from '../user/entities/profile';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    TodoModule,
    TypeORMConfig([User, Profile, Todo, Task]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
