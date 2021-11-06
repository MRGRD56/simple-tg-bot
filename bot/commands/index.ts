import {CommandResult, UserBotCommand, UserBotRegexCommand} from "../../types";
import {Message} from "node-telegram-bot-api";
import startCommand from "./startCommand";
import getStateCommand from "./getStateCommand";
import countIncrementCommand from "./countIncrementCommand";
import countSetCommand from "./countSetCommand";
import multiResponseTestCommand from "./multiResponseTestCommand";
import helpCommand from "./helpCommand";
import {secretCommand, activateSecretCommand, getStatesCommand} from "./secretCommands";
import {unknownCommandResponse} from "../response/responses";
import messageSetCommand from "./messageSetCommand";

const commands: UserBotCommand[] = [
    startCommand,
    getStateCommand,
    countIncrementCommand,
    countSetCommand,
    multiResponseTestCommand,
    helpCommand,
    secretCommand,
    activateSecretCommand,
    getStatesCommand,
    messageSetCommand
];

const isCommandMatch = (command: UserBotCommand, message: Message): boolean => {
    const messageText = message.text;

    if (isRegexCommand(command)) {
        return command.name.test(messageText);
    }

    return command.name === messageText;
};

const isRegexCommand = (command: UserBotCommand): command is UserBotRegexCommand => {
    return command.name instanceof RegExp;
}

const getCommand = (message: Message): UserBotCommand | undefined => {
    return commands.find(command => isCommandMatch(command, message));
};

const executeCommand = (command: UserBotCommand, message: Message): CommandResult => {
    if (isRegexCommand(command)) {
        const regexMatch = command.name.exec(message.text);
        return command.getResponse(message, regexMatch);
    }

    return command.getResponse(message);
};

export const handleMessageCommand = (message: Message): CommandResult => {
    const command = getCommand(message);
    if (!command) {
        return unknownCommandResponse;
    }

    return executeCommand(command, message);
};