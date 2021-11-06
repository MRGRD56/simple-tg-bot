import IBotResponse from "./IBotResponse";
import * as TelegramBot from "node-telegram-bot-api";
import {sendMessageOptions} from "../../constants/defaults";

export default class TextBotResponse implements IBotResponse {
    constructor(private readonly text: string) {
    }

    async send(bot: TelegramBot, chatId: number): Promise<void> {
        await bot.sendMessage(chatId, this.text, sendMessageOptions);
    }
}