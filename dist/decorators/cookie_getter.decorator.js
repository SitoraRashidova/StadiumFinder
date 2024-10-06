"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookiGetter = void 0;
const common_1 = require("@nestjs/common");
exports.CookiGetter = (0, common_1.createParamDecorator)(async (data, context) => {
    const requset = context.switchToHttp().getRequest();
    const refreshToken = requset.cookie[data];
    if (!refreshToken) {
        throw new common_1.UnauthorizedException('token is not found');
    }
    return refreshToken;
});
//# sourceMappingURL=cookie_getter.decorator.js.map