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
exports.UserWalletController = void 0;
const common_1 = require("@nestjs/common");
const user_wallet_service_1 = require("./user_wallet.service");
const create_user_wallet_dto_1 = require("./dto/create-user_wallet.dto");
const update_user_wallet_dto_1 = require("./dto/update-user_wallet.dto");
let UserWalletController = class UserWalletController {
    constructor(userWalletService) {
        this.userWalletService = userWalletService;
    }
    create(createUserWalletDto) {
        return this.userWalletService.create(createUserWalletDto);
    }
    findAll() {
        return this.userWalletService.findAll();
    }
    findOne(id) {
        return this.userWalletService.findOne(+id);
    }
    update(id, updateUserWalletDto) {
        return this.userWalletService.update(+id, updateUserWalletDto);
    }
    remove(id) {
        return this.userWalletService.remove(+id);
    }
};
exports.UserWalletController = UserWalletController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_wallet_dto_1.CreateUserWalletDto]),
    __metadata("design:returntype", void 0)
], UserWalletController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserWalletController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserWalletController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_wallet_dto_1.UpdateUserWalletDto]),
    __metadata("design:returntype", void 0)
], UserWalletController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserWalletController.prototype, "remove", null);
exports.UserWalletController = UserWalletController = __decorate([
    (0, common_1.Controller)('user-wallet'),
    __metadata("design:paramtypes", [user_wallet_service_1.UserWalletService])
], UserWalletController);
//# sourceMappingURL=user_wallet.controller.js.map