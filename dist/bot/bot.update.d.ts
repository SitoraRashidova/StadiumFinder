import { Context } from "telegraf";
import { BotService } from "./bot.service";
export declare class BotUpdate {
    private readonly botService;
    constructor(botService: BotService);
    onStart(ctx: Context): any;
    onContact(ctx: Context): any;
    onStop(ctx: Context): any;
    onAddress(ctx: Context): any;
    addNewAddress(ctx: Context): any;
    onLoaction(ctx: Context): any;
    showAddresses(ctx: Context): any;
    onClickLocation(ctx: Context): any;
    onCar(ctx: Context): any;
    addNewCar(ctx: Context): any;
    onText(ctx: Context): any;
}
