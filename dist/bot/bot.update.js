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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotUpdate = void 0;
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const bot_service_1 = require("./bot.service");
let BotUpdate = class BotUpdate {
    constructor(botService) {
        this.botService = botService;
    }
    async onStart(ctx) {
        await this.botService.start(ctx);
    }
    async onContact(ctx) {
        if ("contact" in ctx.message) {
            await this.botService.onContact(ctx);
        }
    }
    async onStop(ctx) {
        await this.botService.onStop(ctx);
    }
    async onAddress(ctx) {
        await this.botService.onAddress(ctx);
    }
    async addNewAddress(ctx) {
        await this.botService.addNewAddress(ctx);
    }
    async onLoaction(ctx) {
        await this.botService.onLocation(ctx);
    }
    async showAddresses(ctx) {
        await this.botService.showAddresses(ctx);
    }
    async onClickLocation(ctx) {
        await this.botService.onClickLocation(ctx);
    }
    async onCar(ctx) {
        await this.botService.onCar(ctx);
    }
    async addNewCar(ctx) {
        await this.botService.addNewCar(ctx);
    }
    async onText(ctx) {
        await this.botService.onText(ctx);
    }
};
exports.BotUpdate = BotUpdate;
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onStart", null);
__decorate([
    (0, nestjs_telegraf_1.On)("contact"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onContact", null);
__decorate([
    (0, nestjs_telegraf_1.Command)("stop"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onStop", null);
__decorate([
    (0, nestjs_telegraf_1.Command)("address"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onAddress", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Add new address"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "addNewAddress", null);
__decorate([
    (0, nestjs_telegraf_1.On)("location"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onLoaction", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Show addresses"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "showAddresses", null);
__decorate([
    (0, nestjs_telegraf_1.Action)(/location_+[1-9]/),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onClickLocation", null);
__decorate([
    (0, nestjs_telegraf_1.Command)("car"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _j : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onCar", null);
__decorate([
    (0, nestjs_telegraf_1.Hears)("Add new car"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "addNewCar", null);
__decorate([
    (0, nestjs_telegraf_1.On)("text"),
    __param(0, (0, nestjs_telegraf_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof telegraf_1.Context !== "undefined" && telegraf_1.Context) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], BotUpdate.prototype, "onText", null);
exports.BotUpdate = BotUpdate = __decorate([
    (0, nestjs_telegraf_1.Update)(),
    __metadata("design:paramtypes", [bot_service_1.BotService])
], BotUpdate);
//# sourceMappingURL=bot.update.js.map