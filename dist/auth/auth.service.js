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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const admin_service_1 = require("../admin/admin.service");
let AuthService = class AuthService {
    constructor(JwtService, adminService) {
        this.JwtService = JwtService;
        this.adminService = adminService;
    }
    async addAdmin(createAdminDto) {
        const old_admin = await this.adminService.findByLogin(createAdminDto.login);
        if (old_admin) {
            throw new common_1.NotFoundException("Bunday admin mavjud");
        }
        const hashed_password = await bcrypt.hash(createAdminDto.hashed_password, 7);
        const admin = await this.adminService.create({
            ...createAdminDto,
            hashed_password: hashed_password,
        });
        const token = await this.adminGenerateToken(admin);
        admin.hashed_refresh_token = String(token);
        await admin.save();
        return {
            message: "Admin added successfully",
            data: admin,
        };
    }
    async adminGenerateToken(user) {
        const payload = {
            sub: user.id,
            is_creator: user.is_creator,
        };
        return this.JwtService.sign(payload);
    }
    async adminSigIn(adminSignInDto) {
        const admin = await this.adminService.findByLogin(adminSignInDto.login);
        if (!admin) {
            throw new common_1.UnauthorizedException("Login or password incorrect");
        }
        const validPassword = await bcrypt.compare(adminSignInDto.password, admin.hashed_password);
        if (!validPassword) {
            throw new common_1.UnauthorizedException("Login or password incorrect");
        }
        return {
            message: "Admin signed in successfully",
            token: await this.adminGenerateToken(admin),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, admin_service_1.AdminService])
], AuthService);
//# sourceMappingURL=auth.service.js.map