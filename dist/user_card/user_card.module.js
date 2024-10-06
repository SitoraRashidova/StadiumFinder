"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCardModule = void 0;
const common_1 = require("@nestjs/common");
const user_card_service_1 = require("./user_card.service");
const user_card_controller_1 = require("./user_card.controller");
const sequelize_1 = require("@nestjs/sequelize");
const user_card_model_1 = require("./models/user_card.model");
let UserCardModule = class UserCardModule {
};
exports.UserCardModule = UserCardModule;
exports.UserCardModule = UserCardModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_card_model_1.UserCard])],
        controllers: [user_card_controller_1.UserCardController],
        providers: [user_card_service_1.UserCardService],
    })
], UserCardModule);
//# sourceMappingURL=user_card.module.js.map