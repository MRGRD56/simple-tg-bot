import {UserBotCommand} from "../../types";
import TextBotResponse from "../response/TextBotResponse";
import {setState} from "../botStates";

const messageSetCommand: UserBotCommand = {
    name: /^\/message_set(\s+(.*))?/,
    getResponse: (message, match) => {
        const messageValue: string | undefined = match[2];

        if (messageValue?.length > 200) {
            return new TextBotResponse(`The message cannot be longer than 200 characters :(\nYour message length is ${messageValue.length}`);
        }

        setState(message.chat.id, state => {
            return {
                ...state,
                message: messageValue
            };
        })

        return new TextBotResponse("The `message` successfully updated!");
    }
};

export default messageSetCommand;