import TextBotResponse from "../response/TextBotResponse";
import {UserBotCommand} from "../../types";

const startCommand: UserBotCommand = {
    name: "/start",
    getResponse: message => {
        return new TextBotResponse(
            message.from
                ? `Hello, @${message.from.username}!`
                : "Hello!");
    }
};

export default startCommand;