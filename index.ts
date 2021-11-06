import bot from "./bot";
import handleBotMessage from "./bot/handleBotMessage";

bot.on("message", message => {
    return Promise.resolve(handleBotMessage(bot, message));
});