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
exports.ComfortController = void 0;
const common_1 = require("@nestjs/common");
const comfort_service_1 = require("./comfort.service");
const create_comfort_dto_1 = require("./dto/create-comfort.dto");
const update_comfort_dto_1 = require("./dto/update-comfort.dto");
const swagger_1 = require("@nestjs/swagger");
let ComfortController = class ComfortController {
    constructor(comfortService) {
        this.comfortService = comfortService;
    }
    create(createComfortDto) {
        return this.comfortService.create(createComfortDto);
    }
    findAll() {
        return this.comfortService.findAll();
    }
    findOne(id) {
        return this.comfortService.findOne(+id);
    }
    update(id, updateComfortDto) {
        return this.comfortService.update(+id, updateComfortDto);
    }
    remove(id) {
        return this.comfortService.remove(+id);
    }
};
exports.ComfortController = ComfortController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comfort_dto_1.CreateComfortDto]),
    __metadata("design:returntype", void 0)
], ComfortController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ComfortController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComfortController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comfort_dto_1.UpdateComfortDto]),
    __metadata("design:returntype", void 0)
], ComfortController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ComfortController.prototype, "remove", null);
exports.ComfortController = ComfortController = __decorate([
    (0, swagger_1.ApiTags)("Comfort name "),
    (0, common_1.Controller)("comfort"),
    __metadata("design:paramtypes", [comfort_service_1.ComfortService])
], ComfortController);
//# sourceMappingURL=comfort.controller.js.map