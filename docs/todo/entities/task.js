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
exports.Task = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const todo_1 = require("./todo");
let Task = class Task {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', format: 'number' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Task.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'title', description: 'Task title' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'description', description: 'Task description' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Task.prototype, "done", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Task.prototype, "deleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Task.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => todo_1.Todo }),
    (0, typeorm_1.ManyToOne)(() => todo_1.Todo, (todo) => todo.tasks, { onDelete: 'CASCADE' }),
    __metadata("design:type", todo_1.Todo)
], Task.prototype, "todo", void 0);
Task = __decorate([
    (0, typeorm_1.Entity)({ name: 'task' })
], Task);
exports.Task = Task;
//# sourceMappingURL=task.js.map