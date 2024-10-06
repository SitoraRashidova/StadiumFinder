import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Comfort } from "./comfort/models/comfort.model";
import { District } from "./district/models/district.model";
import { DistrictModule } from "./district/district.module";
import { Region } from "./region/models/region.model";
import { RegionModule } from "./region/region.module";
import { CategoriesModule } from './categories/categories.module';
import { Category } from "./categories/models/category.model";
import { ComfortModule } from "./comfort/comfort.module";
import { User } from "./users/models/user.model";
import { UsersModule } from "./users/users.module";
import { MailModule } from './mail/mail.module';
import { UserCardModule } from './user_card/user_card.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { UserCard } from "./user_card/models/user_card.model";
import { UserWallet } from "./user_wallet/models/user_wallet.model";
import { BotModule } from './bot/bot.module';
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { OrderModule } from './order/order.module';
import { Order } from "./order/models/order.model";
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { Bot } from "./bot/models/bot.model";
import { Address } from "./bot/models/address.model";
import { OtpModule } from './otp/otp.module';




@Module({
  imports: [ 
     ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TelegrafModule.forRootAsync({
      botName:BOT_NAME,
      useFactory:()=>({
        token:process.env.BOT_TOKEN,
        include:[BotModule],
        middlewares:[]
      }),

    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Comfort,District,Region,Category,User,UserCard,UserWallet,Order, Bot, Address],
      autoLoadModels: true,
      synchronize: true,
      sync: { alter: true }, // force
      logging: false,
    }),
    ComfortModule,DistrictModule,RegionModule, CategoriesModule, UsersModule, MailModule, UserCardModule, UserWalletModule, BotModule, OrderModule, AdminModule, AuthModule, OtpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
