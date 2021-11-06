import {UserBotCommand} from "../../types";
import {getState} from "../botStates";
import TextBotResponse from "../response/TextBotResponse";
import {stringifyObject} from "../../utils/common";

const getStateCommand: UserBotCommand = {
    name: "/get_state",
    getResponse: message => {
        const state = getState(message.chat.id);
        const jsonString = stringifyObject(state, "yaml");
        return new TextBotResponse("```\n" + jsonString + "\n```");
    }
};

export default getStateCommand;