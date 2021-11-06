import * as yaml from "js-yaml";

export const delay = (ms: number) => new Promise<void>(resolve => {
    setTimeout(() => {
        resolve();
    }, ms);
});

export const stringifyObject = (object, mode: "json" | "yaml") => {
    let objectString: string;

    objectString = mode === "yaml"
        ? yaml.dump(object)
        : JSON.stringify(object, undefined, 2);

    objectString = objectString
        .replaceAll("`", "\\`")
        .replaceAll("*", "\\*")
        .replaceAll("_", "\\_")
        .replaceAll(">", "\\>")
        .replaceAll("<", "\\<")
        .trim();

    return objectString;
};