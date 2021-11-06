import {UserBotCommand} from "../../types";
import {getState, setState} from "../botStates";
import TextBotResponse from "../response/TextBotResponse";

const countSetCommand: UserBotCommand = {
    name: /^\/count_set(\s([+-]?([0-9]+\.?[0-9]*|\.[0-9]+))?)?$/,
    getResponse: (message, match) => {
        const oldState = getState(message.chat.id);

        const newState = setState(message.chat.id, state => {
            const parsedValue = +match[2];
            const newValue = !Number.isNaN(parsedValue) ? parsedValue : 0;

            return {
                ...state,
                count: newValue
            };
        });

        return new TextBotResponse(`COUNT \`${oldState?.count} -> ${newState?.count}\``);
    }
};

export default countSetCommand;