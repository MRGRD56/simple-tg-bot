import {UserBotCommand} from "../../types";
import MultipleBotResponse from "../response/MultipleBotResponse";
import IBotResponse from "../response/IBotResponse";
import {delay} from "../../utils/common";
import TextBotResponse from "../response/TextBotResponse";

const multiResponseTestCommand: UserBotCommand = {
    name: "/multi_response_test",
    getResponse: () => {
        const responsesPromises: Promise<IBotResponse>[] = [];

        for (let i = 0; i < 5; i++) {
            responsesPromises.push(new Promise<IBotResponse>(async resolve => {
                await delay(1000 + i * 1000);
                resolve(new TextBotResponse(`\`${i + 1}\` ${new Date().toISOString()}`));
            }));
        }

        return new MultipleBotResponse([
            new TextBotResponse("Starting at " + new Date().toISOString()),
            ...responsesPromises,
            new TextBotResponse("End")
        ]);
    }
};

export default multiResponseTestCommand;