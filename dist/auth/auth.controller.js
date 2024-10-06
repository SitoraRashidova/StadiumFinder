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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const creator_guard_1 = require("../guards/creator.guard");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const create_admin_dto_1 = require("../admin/dto/create-admin.dto");
const admin_signin_dto_1 = require("./dto/admin-signin.dto");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async addAdmin(createAdminDto) {
        return this.authService.addAdmin(createAdminDto);
    }
    async adminSigIn(adminSignInDto) {
        return this.authService.adminSigIn(adminSignInDto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Yangi admin royhatdan o`tkazish" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "Ro`yxatdan o`tgan admin",
        type: String,
    }),
    (0, common_1.UseGuards)(creator_guard_1.CreatorGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)("add-admin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "addAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Tizimga kirish" }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("signin"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_signin_dto_1.AdminSignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminSigIn", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("AUTH"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map