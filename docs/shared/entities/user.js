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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const todo_1 = require("../../todo/entities/todo");
const profile_1 = require("../../user/entities/profile");
let User = class User {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number', format: 'number' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'password', description: 'The user password' }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: profile_1.Profile, format: 'profile' }),
    (0, typeorm_1.OneToOne)(() => profile_1.Profile, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", profile_1.Profile)
], User.prototype, "profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => todo_1.Todo, format: 'table' }),
    (0, typeorm_1.OneToMany)(() => todo_1.Todo, (todo) => todo.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "todos", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'user' })
], User);
exports.User = User;
//# sourceMappingURL=user.js.map