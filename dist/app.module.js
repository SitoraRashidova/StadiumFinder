"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const comfort_model_1 = require("./comfort/models/comfort.model");
const district_model_1 = require("./district/models/district.model");
const district_module_1 = require("./district/district.module");
const region_model_1 = require("./region/models/region.model");
const region_module_1 = require("./region/region.module");
const categories_module_1 = require("./categories/categories.module");
const category_model_1 = require("./categories/models/category.model");
const comfort_module_1 = require("./comfort/comfort.module");
const user_model_1 = require("./users/models/user.model");
const users_module_1 = require("./users/users.module");
const mail_module_1 = require("./mail/mail.module");
const user_card_module_1 = require("./user_card/user_card.module");
const user_wallet_module_1 = require("./user_wallet/user_wallet.module");
const user_card_model_1 = require("./user_card/models/user_card.model");
const user_wallet_model_1 = require("./user_wallet/models/user_wallet.model");
const bot_module_1 = require("./bot/bot.module");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const app_constants_1 = require("./app.constants");
const order_module_1 = require("./order/order.module");
const order_model_1 = require("./order/models/order.model");
const admin_module_1 = require("./admin/admin.module");
const auth_module_1 = require("./auth/auth.module");
const bot_model_1 = require("./bot/models/bot.model");
const address_model_1 = require("./bot/models/address.model");
const otp_module_1 = require("./otp/otp.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
            nestjs_telegraf_1.TelegrafModule.forRootAsync({
                botName: app_constants_1.BOT_NAME,
                useFactory: () => ({
                    token: process.env.BOT_TOKEN,
                    include: [bot_module_1.BotModule],
                    middlewares: []
                }),
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [comfort_model_1.Comfort, district_model_1.District, region_model_1.Region, category_model_1.Category, user_model_1.User, user_card_model_1.UserCard, user_wallet_model_1.UserWallet, order_model_1.Order, bot_model_1.Bot, address_model_1.Address],
                autoLoadModels: true,
                synchronize: true,
                sync: { alter: true },
                logging: false,
            }),
            comfort_module_1.ComfortModule, district_module_1.DistrictModule, region_module_1.RegionModule, categories_module_1.CategoriesModule, users_module_1.UsersModule, mail_module_1.MailModule, user_card_module_1.UserCardModule, user_wallet_module_1.UserWalletModule, bot_module_1.BotModule, order_module_1.OrderModule, admin_module_1.AdminModule, auth_module_1.AuthModule, otp_module_1.OtpModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map