import {Message} from "node-telegram-bot-api";
import IBotResponse from "../bot/response/IBotResponse";

export interface BotState {
    count: number;
    message?: string;
    secret?: "/zIeFooRIuiFmnKh" | "42";
}

export type BotStates = Record<number, BotState>;

export interface UserBotTextCommand {
    name: string;
    getResponse: (message: Message) => CommandResult;
}

export interface UserBotRegexCommand {
    name: RegExp;
    getResponse: (message: Message, match: RegExpExecArray) => CommandResult;
}

export type UserBotCommand = UserBotTextCommand | UserBotRegexCommand;

export type CommandResult = IBotResponse;