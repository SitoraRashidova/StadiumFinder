import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from "nestjs-telegraf";
import { Context, Markup } from "telegraf";
import { BotService } from "./bot.service";
import { Address } from "./models/address.model";

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await this.botService.start(ctx);
  }
  @On("contact")
  async onContact(@Ctx() ctx: Context) {
    if ("contact" in ctx.message) {
      await this.botService.onContact(ctx);
    }
  }

  @Command("stop")
  async onStop(@Ctx() ctx: Context) {
    await this.botService.onStop(ctx);
  }

  @Command("address")
  async onAddress(@Ctx() ctx: Context) {
    await this.botService.onAddress(ctx);
  }
  @Hears("Add new address")
  async addNewAddress(@Ctx() ctx: Context) {
    await this.botService.addNewAddress(ctx);
  }

  @On("location")
  async onLoaction(@Ctx() ctx: Context) {
    await this.botService.onLocation(ctx);
  }
  @Hears("Show addresses")
  async showAddresses(@Ctx() ctx: Context) {
    await this.botService.showAddresses(ctx);
  }
  @Action(/location_+[1-9]/)
  async onClickLocation(@Ctx() ctx: Context) {
    await this.botService.onClickLocation(ctx);
  }
  @Command("car")
  async onCar(@Ctx() ctx: Context) {
    await this.botService.onCar(ctx);
  }

  @Hears("Add new car")
  async addNewCar(@Ctx() ctx: Context) {
    await this.botService.addNewCar(ctx);
  }

  @On("text")
  async onText(@Ctx() ctx: Context) {
    await this.botService.onText(ctx);
  }

  // @On("photo")
  // async onPhoto(@Ctx() ctx: Context) {
  //   if ("photo" in ctx.message) {
  //     console.log(ctx.message.photo);

  //     await ctx.replyWithPhoto(
  //       String(ctx.message.photo[ctx.message.photo.length - 1].file_id)
  //     );
  //   }
  // }

  // @On("video")
  // async onVideo(@Ctx() ctx: Context) {
  //   if ("video" in ctx.message) {
  //     console.log(ctx.message.video);

  //     await ctx.reply(String(ctx.message.video.file_name));
  //   }
  // }

  // @On("sticker")
  // async onSticker(@Ctx() ctx: Context) {
  //   if ("sticker" in ctx.message) {
  //     console.log(ctx.message.sticker);

  //     await ctx.reply("👍");
  //   }
  // }

  // @On("animation")
  // async onAnimation(@Ctx() ctx: Context) {
  //   if ("animation" in ctx.message) {
  //     console.log(ctx.message.animation);

  //     await ctx.reply(String(ctx.message.animation.duration));
  //   }
  // }

  // @On("contact")
  // async onContact(@Ctx() ctx: Context) {
  //   if ("contact" in ctx.message) {
  //     console.log(ctx.message.contact);

  //     await ctx.reply(String(ctx.message.contact.first_name));
  //     await ctx.reply(String(ctx.message.contact.last_name));
  //     await ctx.reply(String(ctx.message.contact.phone_number));
  //     await ctx.reply(String(ctx.message.contact.user_id));
  //   }
  // }
  // @On("location")
  // async onLocation(@Ctx() ctx: Context) {
  //   if ("location" in ctx.message) {
  //     console.log(ctx.message.location);

  //     await ctx.reply(String(ctx.message.location.latitude));
  //     await ctx.reply(String(ctx.message.location.longitude));
  //     await ctx.replyWithLocation(
  //       ctx.message.location.latitude,
  //       ctx.message.location.longitude
  //     );
  //   }
  // }
  // @On("voice")
  // async onVoive(@Ctx() ctx: Context) {
  //   if ("voice" in ctx.message) {
  //     console.log(ctx.message.voice);

  //     await ctx.reply(String(ctx.message.voice.duration));
  //     await ctx.reply(String(ctx.message.voice.file_size));
  //   }
  // }

  // @On("invoice")
  // async onInVoive(@Ctx() ctx: Context) {
  //   if ("invoice" in ctx.message) {
  //     console.log(ctx.message.invoice);

  //     await ctx.reply(String(ctx.message.invoice.title));
  //   }
  // }

  // @On("document")
  // async onDocumet(@Ctx() ctx: Context) {
  //   if ("document" in ctx.message) {
  //     console.log(ctx.message.document);

  //     await ctx.reply(String(ctx.message.document.file_name));
  //     await ctx.reply(String(ctx.message.document.file_size));
  //   }
  // }
  // //eshitish
  // @Hears("hi")
  // async hearsHi(@Ctx() ctx: Context) {
  //   await ctx.reply("Hey,there!!");
  // }
  // @Command("help")
  // async commadHelp(@Ctx() ctx: Context) {
  //   await ctx.replyWithHTML(
  //     `<b>start</b>-Botni ishga tushirish\n<b>stop</b>-Botni toxtatish\n<b>help</b>-Botni buyuruqlari qanday bajarilishiga yordam`
  //   );
  // }

  // @Command("inline")
  // async inlineButtons(@Ctx() ctx: Context) {
  //   const inlineKeyboard = [
  //     [
  //       {
  //         text: "Button 1",
  //         callback_data: "button_1",
  //       },
  //       {
  //         text: "Button 2",
  //         callback_data: "button_2",
  //       },
  //       {
  //         text: "Button 3",
  //         callback_data: "button_3",
  //       },
  //     ],
  //     [
  //       {
  //         text: "Button 4",
  //         callback_data: "button+_4",
  //       },
  //       {
  //         text: "Button 5",
  //         callback_data: "button_5",
  //       },
  //       {
  //         text: "Button 6",
  //         callback_data: "button_6",
  //       },
  //     ],
  //   ];
  //   await ctx.reply("Click the appropriate button", {
  //     reply_markup: {
  //       inline_keyboard: inlineKeyboard,
  //     },
  //   });
  // }

  // @Action("button1")
  // async onClickButton1(@Ctx() ctx: Context) {
  //   await ctx.reply("Button1 is clicked");
  // }
  // @Action("button2")
  // async onClickButton2(@Ctx() ctx: Context) {
  //   await ctx.reply("Button2 is clicked");
  // }

  // @Action(/button_+[1-9]/)
  // async onClickAnyButton(@Ctx() ctx: Context) {
  //   const actText = ctx.callbackQuery["data"]
  //   const button_id = Number(actText.split("_")[1])
  //   await ctx.reply(`Optional Button ${button_id} is clicked!`);
  // }

  // @Command("main")
  // async mainButtons(@Ctx() ctx: Context) {
  //   await ctx.reply("Click the appropriate Main button:", {
  //     parse_mode: "HTML",
  //     ...Markup.keyboard([
  //       ["one", "two", "three"],
  //       ["four", "five"],
  //       ["six"],
  //       [Markup.button.contactRequest("📞 Send contact number")],
  //       [Markup.button.locationRequest("📍Send location")],
  //     ]).resize(),
  //     // .oneTime(),
  //   });
  // }

  // @Hears("one")
  // async onFirstButtonClick(@Ctx() ctx: Context) {
  //   await ctx.reply("First button is clicked");
  // }

  // @On("text")
  // async onText(@Ctx() ctx: Context) {
  //   console.log(ctx);
  //   if ("text" in ctx.message) {
  //     if (ctx.message.text == "salom") {
  //       await ctx.replyWithHTML("<b> Hello </b>");
  //     } else {
  //       await ctx.replyWithHTML(ctx.message.text);
  //     }
  //   }
  // }
  // //eng ocirida yozilda

  // @On("message")
  // onMessage(@Ctx() ctx: Context) {
  //   console.log(ctx.botInfo);
  //   console.log(ctx.chat);
  //   console.log(ctx.chat.id);
  //   console.log(ctx.from);
  //   console.log(ctx.from.first_name);
  // }
}
