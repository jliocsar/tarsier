import type { Colorette } from "colorette";
type DefaultLogType = "error" | "info" | "success" | "warn";
export type LogLevel = "error" | "info" | "warn" | "debug";
export type Color = <X extends string | number>(text: X) => void;
export type ColorStyle = "reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough";
export type Colors = Exclude<keyof Colorette, ColorStyle | "createColors" | "isColorSupported">;
export type BackgroundColor<C extends Colors = Colors> = C extends `bg${string}` ? C : never;
type LogTypeOptionColor = {
    background?: BackgroundColor;
    foreground?: Exclude<Colors, BackgroundColor>;
    style?: ColorStyle | ColorStyle[];
};
type BaseLogOptions = {
    showProcessPid?: boolean;
    showTimestamp?: boolean;
};
export type LogTypes = Record<string, LogTypeOptions>;
export type LogTypeOptions<P extends string = string> = BaseLogOptions & {
    prefix?: P;
    level?: LogLevel;
    disabled?: boolean;
    beforeColor?: (text: string | number) => string;
    beforeLog?: (text: string | number) => string;
    beforePrefix?: (text: string | number) => string;
    onLog?: (text: string | number) => void | Promise<void>;
} & ({
    removeSeparator?: true;
} | {
    removeSeparator?: false;
    separator?: string;
}) & ({
    label?: true;
    color: LogTypeOptionColor & ({
        samePrefixColor?: true;
    } | {
        samePrefixColor?: false;
        prefixColor?: LogTypeOptionColor;
    });
} | {
    label?: false;
});
export type Base<O extends ConstructorOptions> = {
    readonly options: O;
};
export type ConstructorOptions<LT extends LogTypes = LogTypes> = BaseLogOptions & {
    types?: LT;
};
export type Constructor = {
    new <LT extends LogTypes>(options?: ConstructorOptions<LT>): TarsierInstance<LT>;
};
export type TarsierInstance<LT extends LogTypes, K extends keyof LT = keyof LT | Exclude<DefaultLogType, "error">> = Base<LT> & Record<K, Color> & {
    error: (textOrError: string | number | Error) => void;
};
export {};
