import IBotResponse from "./IBotResponse";
import * as TelegramBot from "node-telegram-bot-api";

export default class NullBotResponse implements IBotResponse {
    send(bot: TelegramBot, chatId: number): Promise<void> {
        return Promise.resolve();
    }
}