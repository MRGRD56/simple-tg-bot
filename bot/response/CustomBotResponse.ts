import IBotResponse from "./IBotResponse";
import * as TelegramBot from "node-telegram-bot-api";

export default class CustomBotResponse implements IBotResponse {
    constructor(private readonly action: (bot: TelegramBot, chatId: number) => Promise<void>) {
    }

    send(bot: TelegramBot, chatId: number): Promise<void> {
        return Promise.resolve(this.action(bot, chatId));
    }
}