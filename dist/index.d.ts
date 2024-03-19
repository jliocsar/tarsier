import type { ConstructorOptions, TarsierInstance, LogTypeOptions, LogTypes } from "./types";
export declare const Style: {
    readonly Bold: "bold";
    readonly Dim: "dim";
    readonly Hidden: "hidden";
    readonly Inverse: "inverse";
    readonly Underline: "underline";
    readonly Strikethrough: "strikethrough";
    readonly Italic: "italic";
    readonly Reset: "reset";
};
export declare const BackgroundColor: {
    readonly Black: "bgBlack";
    readonly BlackBright: "bgBlackBright";
    readonly Red: "bgRed";
    readonly RedBright: "bgRedBright";
    readonly Green: "bgGreen";
    readonly GreenBright: "bgGreenBright";
    readonly Yellow: "bgYellow";
    readonly YellowBright: "bgYellowBright";
    readonly Blue: "bgBlue";
    readonly BlueBright: "bgBlueBright";
    readonly Magenta: "bgMagenta";
    readonly MagentaBright: "bgMagentaBright";
    readonly Cyan: "bgCyan";
    readonly CyanBright: "bgCyanBright";
    readonly White: "bgWhite";
    readonly WhiteBright: "bgWhiteBright";
};
export declare const ForegroundColor: {
    readonly Black: "black";
    readonly BlackBright: "blackBright";
    readonly Red: "red";
    readonly RedBright: "redBright";
    readonly Green: "green";
    readonly GreenBright: "greenBright";
    readonly Yellow: "yellow";
    readonly YellowBright: "yellowBright";
    readonly Blue: "blue";
    readonly BlueBright: "blueBright";
    readonly Magenta: "magenta";
    readonly MagentaBright: "magentaBright";
    readonly Cyan: "cyan";
    readonly CyanBright: "cyanBright";
    readonly White: "white";
    readonly WhiteBright: "whiteBright";
    readonly Gray: "gray";
};
export declare const Color: {
    readonly Style: {
        readonly Bold: "bold";
        readonly Dim: "dim";
        readonly Hidden: "hidden";
        readonly Inverse: "inverse";
        readonly Underline: "underline";
        readonly Strikethrough: "strikethrough";
        readonly Italic: "italic";
        readonly Reset: "reset";
    };
    readonly Background: {
        readonly Black: "bgBlack";
        readonly BlackBright: "bgBlackBright";
        readonly Red: "bgRed";
        readonly RedBright: "bgRedBright";
        readonly Green: "bgGreen";
        readonly GreenBright: "bgGreenBright";
        readonly Yellow: "bgYellow";
        readonly YellowBright: "bgYellowBright";
        readonly Blue: "bgBlue";
        readonly BlueBright: "bgBlueBright";
        readonly Magenta: "bgMagenta";
        readonly MagentaBright: "bgMagentaBright";
        readonly Cyan: "bgCyan";
        readonly CyanBright: "bgCyanBright";
        readonly White: "bgWhite";
        readonly WhiteBright: "bgWhiteBright";
    };
    readonly Foreground: {
        readonly Black: "black";
        readonly BlackBright: "blackBright";
        readonly Red: "red";
        readonly RedBright: "redBright";
        readonly Green: "green";
        readonly GreenBright: "greenBright";
        readonly Yellow: "yellow";
        readonly YellowBright: "yellowBright";
        readonly Blue: "blue";
        readonly BlueBright: "blueBright";
        readonly Magenta: "magenta";
        readonly MagentaBright: "magentaBright";
        readonly Cyan: "cyan";
        readonly CyanBright: "cyanBright";
        readonly White: "white";
        readonly WhiteBright: "whiteBright";
        readonly Gray: "gray";
    };
};
export declare const defaultLogTypes: {
    readonly error: {
        readonly label: true;
        readonly color: {
            readonly foreground: "redBright";
            readonly style: "bold";
            readonly samePrefixColor: true;
        };
    };
    readonly info: {
        readonly label: true;
        readonly color: {
            readonly foreground: "blueBright";
        };
    };
    readonly success: {
        readonly label: true;
        readonly color: {
            readonly foreground: "greenBright";
        };
    };
    readonly warn: {
        readonly label: true;
        readonly color: {
            readonly foreground: "yellowBright";
            readonly style: "bold";
        };
    };
};
export declare function tarsier<LT extends LogTypes>(options?: ConstructorOptions<LT>): TarsierInstance<LT>;
export type { ConstructorOptions as TarsierConstructorOptions, LogTypeOptions as TarsierLogTypeOptions, TarsierInstance, };
