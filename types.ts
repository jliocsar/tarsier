import type { Colorette } from "colorette";

type DefaultLogType = "error" | "info" | "success" | "warn";

export type LogLevel = "error" | "info" | "warn" | "debug";

type Separator<
  S extends string = " ",
  RS extends boolean = false
> = RS extends true ? "" : S;

export type Color = <X extends string | number>(text: X) => void;

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

type BaseLogOptions = {
  showProcessPid?: boolean;
  showTimestamp?: boolean;
};

export type LogTypes = Record<string, LogTypeOptions>;

export type LogTypeOptions<P extends string = string> = BaseLogOptions & {
  prefix?: P;
  level?: LogLevel;
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

export type Base<O extends ConstructorOptions> = {
  readonly options: O;
};

export type ConstructorOptions<LT extends LogTypes = LogTypes> =
  BaseLogOptions & {
    types?: LT;
  };
// export type Options<T extends string> = Required<>;
export type Constructor = {
  new <LT extends LogTypes>(
    options?: ConstructorOptions<LT>
  ): TarsierInstance<LT>;
};

export type TarsierInstance<
  LT extends LogTypes,
  K extends keyof LT = keyof LT | DefaultLogType
> = Base<LT> & Record<K, Color>;
