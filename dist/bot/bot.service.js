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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bot_model_1 = require("./models/bot.model");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const app_constants_1 = require("../app.constants");
const telegraf_1 = require("telegraf");
const address_model_1 = require("./models/address.model");
const car_model_1 = require("./models/car.model");
let BotService = class BotService {
    constructor(botModel, addressModel, carModel, bot) {
        this.botModel = botModel;
        this.addressModel = addressModel;
        this.carModel = carModel;
        this.bot = bot;
    }
    async start(ctx) {
        const userId = ctx.from.id;
        const user = await this.botModel.findByPk(userId);
        if (!user) {
            console.log(user);
            await this.botModel.create({
                user_id: userId,
                username: ctx.from.username,
                first_name: ctx.from.first_name,
                last_name: ctx.from.last_name,
                lang: ctx.from.language_code,
            });
            await ctx.reply(`Please, click <b>📞 Send contact number</b>`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.keyboard([
                    [telegraf_1.Markup.button.contactRequest("📞 Send contact number")],
                ]),
            });
        }
        else if (!user.status) {
            await ctx.reply(`Please, click <b>📞 Send contact number</b>`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.keyboard([
                    [telegraf_1.Markup.button.contactRequest("📞 Send contact number")],
                ]).resize(),
            });
        }
        else {
            await ctx.reply(`This bot is used for activate Stadium Owners.`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.removeKeyboard(),
            });
        }
    }
    async onContact(ctx) {
        if ("contact" in ctx.message) {
            const userId = ctx.from.id;
            const user = await this.botModel.findByPk(userId);
            if (!user) {
                await ctx.reply(`Please, click the start button.`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.keyboard([["/start"]])
                        .resize()
                        .oneTime(),
                });
            }
            else if (ctx.message.contact.user_id != userId) {
                await ctx.reply(`Please, send your contact number.`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.keyboard([
                        [telegraf_1.Markup.button.contactRequest("📞 Send contact number")],
                    ]),
                });
            }
            else {
                await this.botModel.update({
                    phone_number: ctx.message.contact.phone_number,
                    status: true,
                }, { where: { user_id: userId } });
                await ctx.reply(`Congratulations! You are activated!`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.removeKeyboard(),
                });
            }
        }
    }
    async onStop(ctx) {
        const userId = ctx.from.id;
        const user = await this.botModel.findByPk(userId);
        if (!user) {
            await ctx.reply(`You are not registered yet.`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.keyboard([["/start"]])
                    .resize()
                    .oneTime(),
            });
        }
        else if (user.status) {
            await this.botModel.update({
                status: false,
                phone_number: null,
            }, { where: { user_id: userId } });
            await this.bot.telegram.sendChatAction(user.user_id, "typing");
            await ctx.reply(`You are out of the bot.`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.removeKeyboard(),
            });
        }
    }
    async onAddress(ctx) {
        await ctx.reply(`My addresses`, {
            parse_mode: "HTML",
            ...telegraf_1.Markup.keyboard([["My addresses", "Add new address"]]).resize(),
        });
    }
    async addNewAddress(ctx) {
        const userId = ctx.from.id;
        const user = await this.botModel.findByPk(userId);
        if (!user) {
            await ctx.reply(`You are not registered yet.`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.keyboard([["/start"]])
                    .resize()
                    .oneTime(),
            });
        }
        else {
            await this.addressModel.create({
                user_id: userId,
                last_state: "address_name",
            });
            await ctx.reply(`Enter address name:.`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.removeKeyboard(),
            });
        }
    }
    async onText(ctx) {
        if ("text" in ctx.message) {
            const userId = ctx.from.id;
            const user = await this.botModel.findByPk(userId);
            if (!user) {
                await ctx.reply(`You are not registered yet.`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.keyboard([["/start"]])
                        .resize()
                        .oneTime(),
                });
            }
            else {
                const address = await this.addressModel.findOne({
                    where: { user_id: userId },
                    order: [["id", "DESC"]],
                });
                if (address) {
                    if (address.last_state == "address_name") {
                        address.address_name = ctx.message.text;
                        address.last_state = "address";
                        await address.save();
                        await ctx.reply(`Enter address:.`, {
                            parse_mode: "HTML",
                            ...telegraf_1.Markup.removeKeyboard(),
                        });
                    }
                    else if (address.last_state == "address") {
                        address.address = ctx.message.text;
                        address.last_state = "location";
                        await address.save();
                        await ctx.reply(`Send your address location:`, {
                            parse_mode: "HTML",
                            ...telegraf_1.Markup.keyboard([
                                [telegraf_1.Markup.button.locationRequest("Send location")],
                            ]).resize(),
                        });
                    }
                }
            }
        }
    }
    async onLocation(ctx) {
        if ("location" in ctx.message) {
            const userId = ctx.from.id;
            const user = await this.botModel.findByPk(userId);
            if (!user) {
                await ctx.reply(`You are not registered yet.`, {
                    parse_mode: "HTML",
                    ...telegraf_1.Markup.keyboard([["/start"]])
                        .resize()
                        .oneTime(),
                });
            }
            else {
                const address = await this.addressModel.findOne({
                    where: { user_id: userId },
                    order: [["id", "DESC"]],
                });
                if (address) {
                    if (address.last_state == "location") {
                        address.location = `${ctx.message.location}, ${ctx.message.location.longitude}
            }`;
                        address.last_state = "finish";
                        await address.save();
                        await ctx.reply(`Your address is added!.`, {
                            parse_mode: "HTML",
                            ...telegraf_1.Markup.keyboard([
                                ["My addresses", "Add new address"],
                            ]).resize(),
                        });
                    }
                }
            }
        }
    }
    async showAddresses(ctx) {
        const userId = ctx.from.id;
        const user = await this.botModel.findByPk(userId);
        if (!user) {
            await ctx.reply(`You are not registered yet.`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.keyboard([["/start"]])
                    .resize()
                    .oneTime(),
            });
        }
        else {
            const addresses = await this.addressModel.findAll({
                where: { user_id: userId },
            });
            addresses.forEach(async (address) => {
                await ctx.replyWithHTML(`<b>Address name:</b> ${address.address_name}\n<b>Address:<b/>${address.address}`, {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: "See Location",
                                    callback_data: `location_${address.id}`,
                                },
                            ],
                        ],
                    },
                });
            });
        }
    }
    async onClickLocation(ctx) {
        const actText = ctx.callbackQuery["data"];
        const address_id = Number(actText.split("_")[1]);
        const address = await this.addressModel.findByPk(address_id);
        await ctx.replyWithLocation(Number(address.location.split(",")[0]), Number(address.location.split(",")[1]));
    }
    async onCar(ctx) {
        await ctx.reply(`My cars`, {
            parse_mode: "HTML",
            ...telegraf_1.Markup.keyboard([["My cars", "Add new car"]]).resize(),
        });
    }
    async addNewCar(ctx) {
        const userId = ctx.from.id;
        const user = await this.botModel.findByPk(userId);
        if (!user) {
            await ctx.reply(`You are not registered yet.`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.keyboard([["/start"]])
                    .resize()
                    .oneTime(),
            });
        }
        else {
            await this.carModel.create({
                user_id: userId,
                last_state: "car_number",
            });
            await ctx.reply(`Enter car number:.`, {
                parse_mode: "HTML",
                ...telegraf_1.Markup.removeKeyboard(),
            });
        }
    }
    async sendOTP(phone_number, OTP) {
        const user = await this.botModel.findOne({ where: { phone_number } });
        if (!user || !user.status) {
            return false;
        }
        await this.bot.telegram.sendChatAction(user.user_id, "typing");
        await this.bot.telegram.sendMessage(user.user_id, "Verify OTP code:" + OTP);
        return true;
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(bot_model_1.Bot)),
    __param(1, (0, sequelize_1.InjectModel)(address_model_1.Address)),
    __param(2, (0, sequelize_1.InjectModel)(car_model_1.Car)),
    __param(3, (0, nestjs_telegraf_1.InjectBot)(app_constants_1.BOT_NAME)),
    __metadata("design:paramtypes", [Object, Object, Object, typeof (_a = typeof telegraf_1.Telegraf !== "undefined" && telegraf_1.Telegraf) === "function" ? _a : Object])
], BotService);
//# sourceMappingURL=bot.service.js.map