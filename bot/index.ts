import * as config from "../constants/config.json";
import * as TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot(config.telegramBot.token, {
    polling: true
});

export default bot;