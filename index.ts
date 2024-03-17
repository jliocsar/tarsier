import { stdout } from "node:process";
import * as colorette from "colorette";

type TLogLevel = "error" | "info" | "log" | "warn" | "debug";
type TColorStyle =
  | "reset"
  | "bold"
  | "dim"
  | "italic"
  | "underline"
  | "inverse"
  | "hidden"
  | "strikethrough";
type TColors = Exclude<
  keyof typeof colorette,
  TColorStyle | "createColors" | "isColorSupported"
>;
type TBackgroundColor<Colors extends TColors> = Colors extends `bg${string}`
  ? Colors
  : never;
type LogType<Colors extends TColors = TColors> = {
  prefix?: string;
  level?: TLogLevel;
  color?: {
    background?: TBackgroundColor<Colors>;
    foreground?: Exclude<Colors, TBackgroundColor<Colors>>;
    style?: TColorStyle;
    beforeLog?: (text: string | number) => string;
  };
};

type TarsierConfig<
  Name extends string = string,
  LogTypes extends Record<string, LogType> = Record<string, LogType>
> = {
  name?: Name;
  types?: LogTypes;
};

const defaultLogTypes = {
  error: {
    prefix: "✖",
    color: {
      foreground: "red",
    },
  },
  info: {
    prefix: "ℹ",
    color: {
      foreground: "blue",
    },
  },
  success: {
    prefix: "✔",
    color: {
      foreground: "green",
    },
  },
  warn: {
    prefix: "⚠",
    color: {
      foreground: "yellow",
    },
  },
} as const satisfies Record<string, LogType>;

const defaultConfig: TarsierConfig = {
  name: "tarsier",
  types: defaultLogTypes,
} as const;

type DefaultConfig = typeof defaultConfig;

type Base<Config extends TarsierConfig = DefaultConfig> = {
  config: Config;
};
type Instance<Config extends TarsierConfig = DefaultConfig> = Base<Config> & {
  [Key in keyof Config["types"]]: colorette.Color;
};

function buildLog(logType: LogType) {
  const { prefix, color } = logType;
  return (text: string | number) => {
    let output = text;

    if (color) {
      if (color.background) {
        const background = colorette[color.background];
        background(output);
      }

      if (color.foreground) {
        const foreground = colorette[color.foreground];
        output = foreground(output);
      }

      if (color.style) {
        const style = colorette[color.style];
        output = style(output);
      }
    }

    if (prefix) {
      output = `${prefix} ${output}`;
    }
  };
}

export class Tarsier<Config extends TarsierConfig> implements Instance<Config> {
  readonly config: Config;

  constructor(config?: Config) {
    this.config = Object.assign({}, defaultConfig, config ?? null);

    const logTypes = Object.entries(this.config.types!) as [
      keyof Config["types"],
      LogType
    ][];

    for (const [logTypeName, logType] of logTypes) {
      // @ts-ignore idk
      this[logTypeName] = buildLog(logType);
    }

    return this as Instance<Config>;
  }
}
