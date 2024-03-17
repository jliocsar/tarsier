import type { Colorette } from "colorette";

type DefaultLogType = "error" | "info" | "success" | "warn";
export type LogLevel = "error" | "info" | "warn" | "debug";

export type Color = <T extends string | number>(text: T) => T;
export type ColorStyle =
  | "reset"
  | "bold"
  | "dim"
  | "italic"
  | "underline"
  | "inverse"
  | "hidden"
  | "strikethrough";
export type Colors = Exclude<
  keyof Colorette,
  ColorStyle | "createColors" | "isColorSupported"
>;
export type BackgroundColor<C extends Colors = Colors> = C extends `bg${string}`
  ? C
  : never;

type LogTypeOptionColor = {
  background?: BackgroundColor;
  foreground?: Exclude<Colors, BackgroundColor>;
  style?: ColorStyle | ColorStyle[];
};

export type LogTypeOptions<P extends string = string> = {
  prefix?: P;
  level?: LogLevel;
  showProcessPid?: boolean;
  showTimestamp?: boolean;
  color?: LogTypeOptionColor &
    (
      | {
          samePrefixColor?: true;
        }
      | {
          samePrefixColor?: false;
          prefixColor?: LogTypeOptionColor;
        }
    );
  beforeColor?: (text: string | number) => string;
  beforeLog?: (text: string | number) => string;
} & (
  | {
      removeSeparator?: true;
    }
  | {
      removeSeparator?: false;
      separator?: string;
    }
);

export type Base<T extends string = never> = {
  readonly options: ConstructorOptions<T>;
};
export type ConstructorOptions<T extends string> = {
  types?: Partial<Record<T, LogTypeOptions>>;
};
export type Options<T extends string> = Required<ConstructorOptions<T>>;
export type Constructor = {
  new <T extends string = DefaultLogType>(
    options?: ConstructorOptions<T>
  ): Tarsier<T>;
};
export type Tarsier<T extends string = DefaultLogType> = Base<T> &
  Record<T, Color> &
  Record<DefaultLogType, Color>;
