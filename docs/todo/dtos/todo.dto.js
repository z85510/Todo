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
exports.TodoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_1 = require("../../shared/entities/user");
const repeate_enum_1 = require("../enums/repeate.enum");
class TodoDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TodoDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TodoDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ type: 'boolean', format: 'true,false', default: false }),
    __metadata("design:type", Boolean)
], TodoDto.prototype, "done", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ type: 'boolean', format: 'true,false', default: false }),
    __metadata("design:type", Boolean)
], TodoDto.prototype, "deleted", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ type: 'boolean', format: 'true,false', default: false }),
    __metadata("design:type", Boolean)
], TodoDto.prototype, "repeat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_1.User, format: 'user' }),
    __metadata("design:type", user_1.User)
], TodoDto.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(repeate_enum_1.RepeatOptions),
    (0, swagger_1.ApiProperty)({ enum: repeate_enum_1.RepeatOptions, example: repeate_enum_1.RepeatOptions.DAILY }),
    __metadata("design:type", Object)
], TodoDto.prototype, "repeatTime", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    __metadata("design:type", Date)
], TodoDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    __metadata("design:type", Date)
], TodoDto.prototype, "reminderDate", void 0);
exports.TodoDto = TodoDto;
//# sourceMappingURL=todo.dto.js.map