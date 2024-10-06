import { Bot } from "./models/bot.model";
import { Context, Telegraf } from "telegraf";
import { Address } from "./models/address.model";
import { Car } from "./models/car.model";
export declare class BotService {
    private botModel;
    private addressModel;
    private carModel;
    private bot;
    constructor(botModel: typeof Bot, addressModel: typeof Address, carModel: typeof Car, bot: Telegraf<Context>);
    start(ctx: Context): any;
    onContact(ctx: Context): any;
    onStop(ctx: Context): any;
    onAddress(ctx: Context): any;
    addNewAddress(ctx: Context): any;
    onText(ctx: Context): any;
    onLocation(ctx: Context): any;
    showAddresses(ctx: Context): any;
    onClickLocation(ctx: Context): any;
    onCar(ctx: Context): any;
    addNewCar(ctx: Context): any;
    sendOTP(phone_number: string, OTP: string): Promise<boolean>;
}
