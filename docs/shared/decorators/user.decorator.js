"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserId = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const user = ctx.switchToHttp().getRequest().user;
    if (!user) {
        return null;
    }
    return data ? user[data] : user;
});
exports.CurrentUserId = (0, common_1.createParamDecorator)((data, ctx) => {
    const user = ctx.switchToHttp().getRequest().user;
    if (!user) {
        return null;
    }
    return data ? user[data].id : user.id;
});
//# sourceMappingURL=user.decorator.js.map