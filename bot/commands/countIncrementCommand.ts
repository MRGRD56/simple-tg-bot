import {getState, setState} from "../botStates";
import TextBotResponse from "../response/TextBotResponse";
import {UserBotCommand} from "../../types";

const countIncrementCommand: UserBotCommand = {
    name: /^\/count_increment(\s([+-]?([0-9]+\.?[0-9]*|\.[0-9]+))?)?$/,
    getResponse: (message, match) => {
        const oldState = getState(message.chat.id);

        const newState = setState(message.chat.id, state => {
            const parsedValue = +match[2];
            const incrementValue = !Number.isNaN(parsedValue) ? parsedValue : 1;

            return {
                ...state,
                count: (state?.count ?? 0) + incrementValue
            };
        });

        return new TextBotResponse(`COUNT \`${oldState?.count} -> ${newState?.count}\``);
    }
};

export default countIncrementCommand;