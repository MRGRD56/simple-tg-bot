import {UserBotCommand} from "../../types";
import TextBotResponse from "../response/TextBotResponse";

export const helpText = `
Made by @mrgrd56
Available Commands:
/start
/help
/get\\_state
/count\\_increment 123.45
/count\\_set -678.9
/multi\\_response\\_test`.trimStart();

const helpCommand: UserBotCommand = {
    name: "/help",
    getResponse: () => {
        return new TextBotResponse(helpText);
    }
};

export default helpCommand;