import type { Colorette } from "colorette";

type DefaultLogType = "error" | "info" | "success" | "warn";
export type LogLevel = "error" | "info" | "warn" | "debug";

type Separator<
  S extends string = " ",
  RS extends boolean = false
> = RS extends true ? "" : S;
export type Color<
  T extends string = DefaultLogType,
  P extends string = never,
  O extends ConstructorOptions<T, P> = ConstructorOptions<T, P>
> = <F extends P, X extends string | number>(
  text: X
) => T extends keyof NonNullable<O["types"]>
  ? NonNullable<NonNullable<O["types"]>[T]> extends {
      prefix?: infer PF;
      removeSeparator?: infer RS;
      separator?: infer S;
    }
    ? `${PF extends string ? PF : never}${Separator<
        S extends string ? S : never,
        RS extends boolean ? RS : never
      >}${X}`
    : never
  : X;
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

export type Base<T extends string = never, P extends string = never> = {
  readonly options: ConstructorOptions<T, P>;
};
export type ConstructorOptions<
  T extends string,
  P extends string = never
> = BaseLogOptions & {
  types?: Partial<Record<T, LogTypeOptions<P>>>;
};
export type Options<T extends string> = Required<ConstructorOptions<T>>;
export type Constructor = {
  new <T extends string = DefaultLogType, P extends string = never>(
    options?: ConstructorOptions<T>
  ): Tarsier<T, P>;
};
export type Tarsier<
  T extends string = DefaultLogType,
  P extends string = never,
  O extends ConstructorOptions<T, P> = ConstructorOptions<T, P>
> = Base<T> &
  Record<T, Color<T, P, O>> &
  Record<DefaultLogType, Color<T, P, O>>;
