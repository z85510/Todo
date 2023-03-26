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
exports.Todo = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_1 = require("../../shared/entities/user");
const repeate_enum_1 = require("../enums/repeate.enum");
const task_1 = require("./task");
let Todo = class Todo {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', format: 'number' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'title', description: 'Todo title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'description', description: 'Todo description' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Todo.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, default: () => false }),
    __metadata("design:type", Boolean)
], Todo.prototype, "done", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true, default: () => false }),
    __metadata("design:type", Boolean)
], Todo.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Todo.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Todo.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Todo.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Todo.prototype, "reminderDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ nullable: true, default: () => false }),
    __metadata("design:type", Boolean)
], Todo.prototype, "repeat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: repeate_enum_1.RepeatOptions,
        default: repeate_enum_1.RepeatOptions.NONE,
        example: repeate_enum_1.RepeatOptions.DAILY,
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: repeate_enum_1.RepeatOptions,
        default: repeate_enum_1.RepeatOptions.NONE,
    }),
    __metadata("design:type", Object)
], Todo.prototype, "repeatTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => task_1.Task, format: 'table' }),
    (0, typeorm_1.OneToMany)(() => task_1.Task, (task) => task.todo, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Todo.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.todos, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_1.User)
], Todo.prototype, "user", void 0);
Todo = __decorate([
    (0, typeorm_1.Entity)({ name: 'todo' })
], Todo);
exports.Todo = Todo;
//# sourceMappingURL=todo.js.map