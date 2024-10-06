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
exports.UserCardService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_card_model_1 = require("./models/user_card.model");
let UserCardService = class UserCardService {
    constructor(userCardModel) {
        this.userCardModel = userCardModel;
    }
    create(createUserCardDto) {
        return this.userCardModel.create(createUserCardDto);
    }
    findAll() {
        return this.userCardModel.findAll({ include: { all: true } });
    }
    findOne(id) {
        return this.userCardModel.findByPk(id, { include: { all: true } });
    }
    update(id, updateUserCardDto) {
        return this.userCardModel.update(updateUserCardDto, { where: { id } });
    }
    remove(id) {
        return this.userCardModel.destroy({ where: { id } });
    }
};
exports.UserCardService = UserCardService;
exports.UserCardService = UserCardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_card_model_1.UserCard)),
    __metadata("design:paramtypes", [Object])
], UserCardService);
//# sourceMappingURL=user_card.service.js.map