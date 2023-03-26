"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let CustomExceptionFilter = class CustomExceptionFilter {
    catch(error, host) {
        const response = host.switchToHttp().getResponse();
        let statusCode;
        let message;
        switch (true) {
            case error instanceof common_1.NotFoundException:
                statusCode = 404;
                message = error.message;
                break;
            case error instanceof common_1.UnauthorizedException:
                statusCode = 401;
                message = 'Access Denied!, ' + error.message;
                break;
            case error instanceof common_1.ForbiddenException:
                statusCode = 503;
                message = 'Hmmmm!, ' + error.message;
                break;
            default:
                statusCode = 400;
                message = error.message;
                break;
        }
        const responseBody = {
            statusCode: statusCode,
            message: message,
            details: '',
        };
        if (error && error['response'] && error['response']['message']) {
            responseBody.details = error['response']['message'];
        }
        else {
            delete responseBody.details;
        }
        response.status(statusCode).json(responseBody);
    }
};
CustomExceptionFilter = __decorate([
    (0, common_1.Catch)(Error)
], CustomExceptionFilter);
exports.CustomExceptionFilter = CustomExceptionFilter;
//# sourceMappingURL=exceptions_filter.js.map