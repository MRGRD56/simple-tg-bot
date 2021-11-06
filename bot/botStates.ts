import {BotState, BotStates} from "../types";

const botStates: BotStates = {};

export type BotStateCallback = ((oldState: BotState | undefined) => BotState) | BotState;

/**
 * Returns the state of the chat.
 * @param chatId
 */
export const getState = (chatId: number): BotState | undefined => {
    return botStates[chatId];
};

/**
 * Sets the state of the chat and returns the new state.
 * @param chatId
 * @param state
 */
export const setState = (chatId: number, state: BotStateCallback): BotState => {
    const newState = getBotNewState(chatId, state);
    botStates[chatId] = newState;
    return newState;
};

export const getStates = () => JSON.parse(JSON.stringify(botStates)) as BotStates;

export const initializeState = (chatId: number) => {
    const chatState = getState(chatId);

    if (chatState) return;

    setState(chatId, {
        count: 0
    });
};

const getBotNewState = (chatId: number, botStateCallback: BotStateCallback) => {
    let newState: BotState;

    if (botStateCallback instanceof Function) {
        const oldState = getState(chatId);
        newState = botStateCallback(oldState);
    } else {
        newState = botStateCallback;
    }

    return newState;
};
