import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";
import { where } from "sequelize";
import { Address } from "./models/address.model";
import { Car } from "./models/car.model";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private botModel: typeof Bot,
    @InjectModel(Address) private addressModel: typeof Address,
    @InjectModel(Car) private carModel: typeof Car,
    @InjectBot(BOT_NAME) private bot: Telegraf<Context>
  ) {}
  async start(ctx: Context) {
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
        ...Markup.keyboard([
          [Markup.button.contactRequest("📞 Send contact number")],
        ]),
      });
    } else if (!user.status) {
      await ctx.reply(`Please, click <b>📞 Send contact number</b>`, {
        parse_mode: "HTML",
        ...Markup.keyboard([
          [Markup.button.contactRequest("📞 Send contact number")],
        ]).resize(),
      });
    } else {
      await ctx.reply(`This bot is used for activate Stadium Owners.`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }
  async onContact(ctx: Context) {
    if ("contact" in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`Please, click the start button.`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else if (ctx.message.contact.user_id != userId) {
        await ctx.reply(`Please, send your contact number.`, {
          parse_mode: "HTML",
          ...Markup.keyboard([
            [Markup.button.contactRequest("📞 Send contact number")],
          ]),
        });
      } else {
        await this.botModel.update(
          {
            phone_number: ctx.message.contact.phone_number,
            status: true,
          },
          { where: { user_id: userId } }
        );
        await ctx.reply(`Congratulations! You are activated!`, {
          parse_mode: "HTML",
          ...Markup.removeKeyboard(),
        });
      }
    }
  }

  async onStop(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`You are not registered yet.`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else if (user.status) {
      await this.botModel.update(
        {
          status: false,
          phone_number: null,
        },
        { where: { user_id: userId } }
      );
      await this.bot.telegram.sendChatAction(user.user_id, "typing");

      await ctx.reply(`You are out of the bot.`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async onAddress(ctx: Context) {
    await ctx.reply(`My addresses`, {
      parse_mode: "HTML",
      ...Markup.keyboard([["My addresses", "Add new address"]]).resize(),
    });
  }

  async addNewAddress(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`You are not registered yet.`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      await this.addressModel.create({
        user_id: userId,
        last_state: "address_name",
      });

      await ctx.reply(`Enter address name:.`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async onText(ctx: Context) {
    if ("text" in ctx.message) {
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`You are not registered yet.`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else {
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
              ...Markup.removeKeyboard(),
            });
          } else if (address.last_state == "address") {
            address.address = ctx.message.text;
            address.last_state = "location";
            await address.save();
            await ctx.reply(`Send your address location:`, {
              parse_mode: "HTML",
              ...Markup.keyboard([
                [Markup.button.locationRequest("Send location")],
              ]).resize(),
            });
          }
        }
        // const car = await this.carModel.findOne({
        //   where: { user_id: userId },
        //   order: [["id", "DESC"]],
        // });
        // if (car) {
        //   if (car.last_state == "car_number") {
        //     car.car_number = ctx.message.text;
        //     car.last_state = "model";
        //     await car.save();
        //     await ctx.reply(`Enter car model:.`, {
        //       parse_mode: "HTML",
        //       ...Markup.removeKeyboard(),
        //     });
        //   } else if (car.last_state == "car_model") {
        //     car.car_number = ctx.message.text;
        //     car.last_state = "color";
        //     await address.save();
        //     await ctx.reply(`Send your car color:`, {
        //       parse_mode: "HTML",
        //       ...Markup.removeKeyboard(),
        //     });
        //   } else if (car.last_state == "car_color") {
        //     car.car_number = ctx.message.text;
        //     car.last_state = "year";
        //     await address.save();
        //     await ctx.reply(`Send your car year:`, {
        //       parse_mode: "HTML",
        //       ...Markup.removeKeyboard(),
        //     });
        //   }
        // }
      }
    }
  }

  async onLocation(ctx: Context) {
    if ("location" in ctx.message) {
      // await ctx.reply(String(ctx.message.location.latitude));
      // await ctx.reply(String(ctx.message.location.longitude));
      const userId = ctx.from.id;
      const user = await this.botModel.findByPk(userId);
      if (!user) {
        await ctx.reply(`You are not registered yet.`, {
          parse_mode: "HTML",
          ...Markup.keyboard([["/start"]])
            .resize()
            .oneTime(),
        });
      } else {
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
              ...Markup.keyboard([
                ["My addresses", "Add new address"],
              ]).resize(),
            });
          }
        }
      }
    }
  }

  async showAddresses(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`You are not registered yet.`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      const addresses = await this.addressModel.findAll({
        where: { user_id: userId },
      });
      addresses.forEach(async (address) => {
        await ctx.replyWithHTML(
          `<b>Address name:</b> ${address.address_name}\n<b>Address:<b/>${address.address}`,
          {
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
          }
        );
      });
    }
  }

  async onClickLocation(ctx: Context) {
    const actText = ctx.callbackQuery["data"];
    const address_id = Number(actText.split("_")[1]);
    const address = await this.addressModel.findByPk(address_id);
    await ctx.replyWithLocation(
      Number(address.location.split(",")[0]),
      Number(address.location.split(",")[1])
    );
  }

  async onCar(ctx: Context) {
    await ctx.reply(`My cars`, {
      parse_mode: "HTML",
      ...Markup.keyboard([["My cars", "Add new car"]]).resize(),
    });
  }

  async addNewCar(ctx: Context) {
    const userId = ctx.from.id;
    const user = await this.botModel.findByPk(userId);
    if (!user) {
      await ctx.reply(`You are not registered yet.`, {
        parse_mode: "HTML",
        ...Markup.keyboard([["/start"]])
          .resize()
          .oneTime(),
      });
    } else {
      await this.carModel.create({
        user_id: userId,
        last_state: "car_number",
      });

      await ctx.reply(`Enter car number:.`, {
        parse_mode: "HTML",
        ...Markup.removeKeyboard(),
      });
    }
  }

  async sendOTP(phone_number: string, OTP: string): Promise<boolean> {
    const user = await this.botModel.findOne({ where: { phone_number } });
    if (!user || !user.status) {
      return false;
    }

    await this.bot.telegram.sendChatAction(user.user_id, "typing");
    await this.bot.telegram.sendMessage(user.user_id, "Verify OTP code:" + OTP);
    return true;
  }
}
