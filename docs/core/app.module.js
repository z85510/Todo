"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const jwt_auth_guard_1 = require("../auth/strategies/jwt_auth.guard");
const user_1 = require("../shared/entities/user");
const exceptions_filter_1 = require("../shared/filters/exceptions_filter");
const _logger_middleware_1 = require("../shared/middlewares/ logger.middleware");
const task_1 = require("../todo/entities/task");
const todo_1 = require("../todo/entities/todo");
const todo_module_1 = require("../todo/todo.module");
const profile_1 = require("../user/entities/profile");
const users_module_1 = require("../user/users.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(_logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.GET });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            todo_module_1.TodoModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'x9n7z4a1Sa',
                database: 'snakes_pool',
                entities: [user_1.User, profile_1.Profile, todo_1.Todo, task_1.Task],
                synchronize: true,
            }),
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: exceptions_filter_1.CustomExceptionFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map