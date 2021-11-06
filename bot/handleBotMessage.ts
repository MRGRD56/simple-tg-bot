import {Message} from "node-telegram-bot-api";
import * as TelegramBot from "node-telegram-bot-api";
import {handleMessageCommand} from "./commands";
import {initializeState} from "./botStates";

const handleBotMessage = async (bot: TelegramBot, message: Message) => {
    const chatId = message.chat.id;

    initializeState(chatId);
    const commandResult = handleMessageCommand(message);

    if (commandResult == null) return;

    await commandResult.send(bot, chatId);
}

export default handleBotMessage;