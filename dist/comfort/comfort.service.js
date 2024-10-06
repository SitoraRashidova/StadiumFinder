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
exports.ComfortService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const comfort_model_1 = require("./models/comfort.model");
let ComfortService = class ComfortService {
    constructor(comfortModels) {
        this.comfortModels = comfortModels;
    }
    create(createComfortDto) {
        return this.comfortModels.create(createComfortDto);
    }
    findAll() {
        return this.comfortModels.findAll({ include: { all: true } });
    }
    findOne(id) {
        return this.comfortModels.findByPk(id, { include: { all: true } });
    }
    update(id, updateComfortDto) {
        return this.comfortModels.update(updateComfortDto, { where: { id } });
    }
    remove(id) {
        return this.comfortModels.destroy({ where: { id } });
    }
    ;
};
exports.ComfortService = ComfortService;
exports.ComfortService = ComfortService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(comfort_model_1.Comfort)),
    __metadata("design:paramtypes", [Object])
], ComfortService);
//# sourceMappingURL=comfort.service.js.map