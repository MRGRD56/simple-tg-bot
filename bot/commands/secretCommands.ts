import {UserBotCommand} from "../../types";
import {getState, getStates, setState} from "../botStates";
import TextBotResponse from "../response/TextBotResponse";
import {unknownCommandResponse} from "../response/responses";
import {stringifyObject} from "../../utils/common";

const isSecretActivated = (chatId: number) => {
    const state = getState(chatId);
    return state.secret === "42";
};

const canActivateSecret = (chatId: number) => {
    const state = getState(chatId);
    return state.secret === "/zIeFooRIuiFmnKh";
};

export const secretCommand: UserBotCommand = {
    name: "/secret",
    getResponse: message => {
        if (isSecretActivated(message.chat.id)) {
            return new TextBotResponse("You already activated the secret! Try /get\\_states");
        }

        setState(message.chat.id, state => {
            return {
                ...state,
                secret: "/zIeFooRIuiFmnKh"
            };
        });

        return new TextBotResponse("*Unknown command*");
    }
};

export const activateSecretCommand: UserBotCommand = {
    name: "/zIeFooRIuiFmnKh",
    getResponse: message => {
        if (!canActivateSecret(message.chat.id)) {
            return unknownCommandResponse;
        }
        if (isSecretActivated(message.chat.id)) {
            return new TextBotResponse("You already activated the secret! Try /get\\_states");
        }

        setState(message.chat.id, state => {
            return {
                ...state,
                secret: "42"
            };
        });
        return new TextBotResponse("`SECRET` Now you can use /get\\_states command!");
    }
};

export const getStatesCommand: UserBotCommand = {
    name: "/get_states",
    getResponse: message => {
        if (!isSecretActivated(message.chat.id)) {
            return unknownCommandResponse;
        }

        return new TextBotResponse("```\n" + stringifyObject(getStates(), "yaml") + "\n```");
    }
};