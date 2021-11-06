import IBotResponse from "./IBotResponse";
import * as TelegramBot from "node-telegram-bot-api";

export default class MultipleBotResponse implements IBotResponse {
    constructor(private readonly botResponses: (IBotResponse | Promise<IBotResponse>)[],
                private readonly isParallel: boolean = false) {
    }

    async send(bot: TelegramBot, chatId: number): Promise<void> {
        for (const botResponse of this.botResponses) {
            if (botResponse instanceof Promise) {
                if (!this.isParallel) {
                    const response = await botResponse;
                    await response.send(bot, chatId);
                } else {
                    botResponse
                        .then(response => {
                            response.send(bot, chatId);
                        })
                        .catch(error => console.error(error));
                }
            } else {
                await botResponse.send(bot, chatId);
            }
        }
    }
}