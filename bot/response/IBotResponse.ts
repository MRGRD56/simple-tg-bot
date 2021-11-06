import * as TelegramBot from "node-telegram-bot-api";

export default interface IBotResponse {
    send(bot: TelegramBot, chatId: number): Promise<void>
}