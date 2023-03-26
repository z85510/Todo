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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_1 = require("../entities/task");
const todo_1 = require("../entities/todo");
let TodoService = class TodoService {
    constructor(todoRepository, taskRepository) {
        this.todoRepository = todoRepository;
        this.taskRepository = taskRepository;
    }
    async findAll(user) {
        return this.todoRepository.find({
            where: { user },
        });
    }
    async findById(todoId) {
        const todo = await this.todoRepository.findOne({
            where: { id: todoId },
            relations: ['tasks'],
        });
        if (!todo || todoId == undefined || !todoId) {
            throw new common_1.NotFoundException(`Todo with id ${todoId} not found`);
        }
        const todoItem = {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            done: todo.done,
            deleted: todo.deleted,
            updatedAt: todo.updatedAt,
            dueDate: todo.dueDate,
            reminderDate: todo.reminderDate,
            repeat: todo.repeat,
            repeatTime: todo.repeatTime,
            tasks: todo.tasks,
        };
        return todoItem;
    }
    async createTodo(todoDetail) {
        try {
            const newTodo = this.todoRepository.create(Object.assign(Object.assign({}, todoDetail), { createdAt: new Date(), updatedAt: new Date() }));
            const createdTodo = await this.todoRepository.save(newTodo);
            const todoItem = {
                id: createdTodo.id,
                title: createdTodo.title,
                description: createdTodo.description,
                done: createdTodo.done,
                deleted: createdTodo.deleted,
                updatedAt: createdTodo.updatedAt,
                dueDate: createdTodo.dueDate,
                reminderDate: createdTodo.reminderDate,
                repeat: createdTodo.repeat,
                repeatTime: createdTodo.repeatTime,
            };
            return todoItem;
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateById(todoId, todoDetails) {
        const todo = await this.findById(todoId);
        const updatedUser = await this.todoRepository.save(Object.assign(Object.assign(Object.assign({}, todo), todoDetails), { updatedAt: new Date() }));
        const todoItem = {
            id: updatedUser.id,
            title: updatedUser.title,
            description: updatedUser.description,
            done: updatedUser.done,
            deleted: updatedUser.deleted,
            updatedAt: updatedUser.updatedAt,
            dueDate: updatedUser.dueDate,
            reminderDate: updatedUser.reminderDate,
            repeat: updatedUser.repeat,
            repeatTime: updatedUser.repeatTime,
        };
        return todoItem;
    }
};
TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(todo_1.Todo)),
    __param(1, (0, typeorm_1.InjectRepository)(task_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map