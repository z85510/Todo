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
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_decorator_1 = require("../../shared/decorators/user.decorator");
const user_1 = require("../../shared/entities/user");
const todo_dto_1 = require("../dtos/todo.dto");
const todo_1 = require("../entities/todo");
const todo_service_1 = require("../services/todo.service");
let TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async findAll(user) {
        return this.todoService.findAll(user);
    }
    async create(todo, user) {
        const errors = await (0, class_validator_1.validate)(todo);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
        todo.user = user;
        return this.todoService.createTodo(todo);
    }
    findUser(id) {
        return this.todoService.findById(id);
    }
    async updateById(id, todo) {
        return this.todoService.updateById(id, todo);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all todos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all users', type: [todo_1.Todo] }),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new Todo' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Create  userProfile',
        type: todo_1.Todo,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [todo_dto_1.TodoDto,
        user_1.User]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Find todo by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return  todo', type: todo_1.Todo }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TodoController.prototype, "findUser", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update todo by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return  todo', type: todo_1.Todo }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, todo_dto_1.TodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateById", null);
TodoController = __decorate([
    (0, common_1.Controller)('todo'),
    (0, swagger_1.ApiTags)('Todo'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
exports.TodoController = TodoController;
//# sourceMappingURL=todo.controller.js.map