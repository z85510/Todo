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
exports.CreateUserProfileParamsValidator = exports.Profile = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
let Profile = class Profile {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'number' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Profile.prototype, "mobileNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Profile.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'date-time' }),
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Profile.prototype, "createdAt", void 0);
Profile = __decorate([
    (0, typeorm_1.Entity)({ name: 'user_profiles' })
], Profile);
exports.Profile = Profile;
class CreateUserProfileParamsValidator {
}
__decorate([
    (0, class_transformer_1.Type)(() => Profile),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Profile)
], CreateUserProfileParamsValidator.prototype, "userProfileDetail", void 0);
exports.CreateUserProfileParamsValidator = CreateUserProfileParamsValidator;
//# sourceMappingURL=profile.js.map