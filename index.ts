import { stdout } from "node:process";
import * as colorette from "colorette";
import type {
  ConstructorOptions,
  TarsierInstance,
  LogTypeOptions,
  LogTypes,
} from "./types";

export const Style = {
  Bold: "bold",
  Dim: "dim",
  Hidden: "hidden",
  Inverse: "inverse",
  Underline: "underline",
  Strikethrough: "strikethrough",
  Italic: "italic",
  Reset: "reset",
} as const;
export const BackgroundColor = {
  Black: "bgBlack",
  BlackBright: "bgBlackBright",
  Red: "bgRed",
  RedBright: "bgRedBright",
  Green: "bgGreen",
  GreenBright: "bgGreenBright",
  Yellow: "bgYellow",
  YellowBright: "bgYellowBright",
  Blue: "bgBlue",
  BlueBright: "bgBlueBright",
  Magenta: "bgMagenta",
  MagentaBright: "bgMagentaBright",
  Cyan: "bgCyan",
  CyanBright: "bgCyanBright",
  White: "bgWhite",
  WhiteBright: "bgWhiteBright",
} as const;
export const ForegroundColor = {
  Black: "black",
  BlackBright: "blackBright",
  Red: "red",
  RedBright: "redBright",
  Green: "green",
  GreenBright: "greenBright",
  Yellow: "yellow",
  YellowBright: "yellowBright",
  Blue: "blue",
  BlueBright: "blueBright",
  Magenta: "magenta",
  MagentaBright: "magentaBright",
  Cyan: "cyan",
  CyanBright: "cyanBright",
  White: "white",
  WhiteBright: "whiteBright",
  Gray: "gray",
} as const;
export const Color = {
  Style,
  Background: BackgroundColor,
  Foreground: ForegroundColor,
} as const;

class Tarsier<LT extends LogTypes> {
  private readonly defaultLogTypes = {
    error: {
      prefix: "✖",
      color: {
        foreground: ForegroundColor.RedBright,
      },
    },
    info: {
      prefix: "ℹ",
      color: {
        foreground: ForegroundColor.BlueBright,
      },
    },
    success: {
      prefix: "✔",
      color: {
        foreground: ForegroundColor.GreenBright,
      },
    },
    warn: {
      prefix: "⚠",
      color: {
        foreground: ForegroundColor.YellowBright,
      },
    },
  } as const;

  public options: ConstructorOptions<LT>;

  constructor(options?: ConstructorOptions<LT>) {
    // @ts-expect-error ffs
    this.options = {
      ...options,
      types: {
        ...this.defaultLogTypes,
        ...options?.types,
      },
    } as ConstructorOptions<LT>;

    const logTypes = Object.entries(this.options.types!) as [
      keyof LT,
      LogTypeOptions
    ][];

    for (const [logTypeName, logType] of logTypes) {
      // @ts-expect-error trust me bro
      this[logTypeName] = this.build(logType);
    }
  }

  private build(options: LogTypeOptions) {
    let {
      prefix = null,
      color = null,
      level = "info",
      showProcessPid = this.options.showProcessPid ?? false,
      showTimestamp = this.options.showTimestamp ?? true,
      beforePrefix = null,
      beforeLog = null,
      beforeColor = null,
    } = options;
    return (text: string | number) => {
      let output = text;
      let hasAttachedPrefix = false;

      if (beforeColor) {
        output = beforeColor(output);
      }

      if (color) {
        if (color.background) {
          const background = colorette[color.background];
          output = background(output);
        }

        if (color.foreground) {
          const foreground = colorette[color.foreground];
          if (prefix && color.samePrefixColor) {
            // Attach prefix to the output beforehand, so we can color it together
            if (beforePrefix) {
              prefix = beforePrefix(prefix);
            }
            output = this.prefixWithSeparator(prefix, output, options);
            hasAttachedPrefix = true;
          }
          output = foreground(output);
        }

        if (color.style) {
          if (Array.isArray(color.style)) {
            for (const logColorStyle of color.style) {
              const style = colorette[logColorStyle];
              output = style(output);
            }
          } else {
            const style = colorette[color.style];
            output = style(output);
          }
        }
      }

      // Attach prefix to the output if it wasn't attached before (e.g. because of color options)
      if (prefix && !hasAttachedPrefix) {
        if (beforePrefix) {
          prefix = beforePrefix(prefix);
        }
        if (color && "prefixColor" in color) {
          const prefixColor = color.prefixColor;
          if (prefixColor?.background) {
            const background = colorette[prefixColor.background];
            prefix = background(prefix);
          }

          if (prefixColor?.foreground) {
            const foreground = colorette[prefixColor.foreground];
            prefix = foreground(prefix);
          }

          if (prefixColor?.style) {
            if (Array.isArray(prefixColor.style)) {
              for (const logColorStyle of prefixColor.style) {
                const style = colorette[logColorStyle];
                prefix = style(prefix);
              }
            } else {
              const style = colorette[prefixColor.style];
              prefix = style(prefix);
            }
          }
        }
        output = this.prefixWithSeparator(prefix, output, options);
      }

      if (showTimestamp) {
        const timestamp = new Date()
          .toISOString()
          .replace(/Z$/, "")
          .replace("T", " ");
        output = this.prefixWithSeparator(
          this.label(timestamp),
          output,
          options
        );
      }

      if (showProcessPid) {
        const pid = process.pid;
        output = this.prefixWithSeparator(this.label(pid), output, options);
      }

      if (beforeLog) {
        output = beforeLog(output);
      }

      this.log(output);
    };
  }

  private label(text: string | number) {
    return colorette.dim(`[${text}]`);
  }

  private log(text: string | number) {
    stdout.write(`${text}\n`);
  }

  private prefixWithSeparator(
    prefix: string,
    text: string | number,
    options: LogTypeOptions
  ) {
    if (options.removeSeparator) {
      return `${prefix}${text}`;
    }
    const separator = "separator" in options ? options.separator : " ";
    return `${prefix}${separator}${text}`;
  }
}

export function tarsier<LT extends LogTypes>(
  options?: ConstructorOptions<LT>
): TarsierInstance<LT> {
  // @ts-expect-error
  return new Tarsier(options) as TarsierInstance<LT>;
}

export type {
  ConstructorOptions as TarsierConstructorOptions,
  LogTypeOptions as TarsierLogTypeOptions,
  TarsierInstance,
};
