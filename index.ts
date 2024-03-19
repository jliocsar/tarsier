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

export const defaultLogTypes = {
  error: {
    label: true,
    color: {
      foreground: ForegroundColor.RedBright,
      style: Style.Bold,
      samePrefixColor: true,
    },
  },
  info: {
    label: true,
    color: {
      foreground: ForegroundColor.BlueBright,
    },
  },
  success: {
    label: true,
    color: {
      foreground: ForegroundColor.GreenBright,
    },
  },
  warn: {
    label: true,
    color: {
      foreground: ForegroundColor.YellowBright,
      style: Style.Bold,
    },
  },
} as const satisfies LogTypes;

class Tarsier<LT extends LogTypes> {
  public options: ConstructorOptions<LT>;

  constructor(options?: ConstructorOptions<LT>) {
    // @ts-expect-error ffs
    this.options = {
      ...options,
      types: {
        ...defaultLogTypes,
        ...options?.types,
      },
    } as ConstructorOptions<LT>;

    const logTypes = Object.entries(this.options.types!) as [
      keyof LT,
      LogTypeOptions
    ][];

    for (const [logTypeName, logType] of logTypes) {
      // @ts-expect-error trust me bro
      this[logTypeName] = this.build(logTypeName, logType);
    }
  }

  private build(typeName: string, options: LogTypeOptions) {
    let {
      prefix = null,
      level = "info",
      label = false,
      disabled = false,
      showProcessPid = this.options.showProcessPid ?? false,
      showTimestamp = this.options.showTimestamp ?? true,
      beforePrefix = null,
      beforeLog = null,
      beforeColor = null,
      onLog = null,
    } = options;
    return (text: string | number | Error) => {
      if (disabled) {
        return;
      }

      const isError = text instanceof Error;
      let output = isError ? text.message : text;
      let labelText = label ? ` ${typeName.toUpperCase()} ` : null;
      let hasAttachedPrefix = false;

      if (beforeColor) {
        output = beforeColor(output);
      }

      if (prefix && beforePrefix) {
        prefix = beforePrefix(prefix);
      }

      const color = "color" in options ? options.color : null;
      if (color) {
        if (color.background) {
          const background = colorette[color.background];
          if (prefix && color.samePrefixColor && !hasAttachedPrefix) {
            output = this.prefixWithSeparator(prefix, output, options);
            hasAttachedPrefix = true;
          }
          if (labelText) {
            labelText = background(labelText);
          }
          output = background(output);
        }

        if (color.foreground) {
          const foreground = colorette[color.foreground];
          if (prefix && color.samePrefixColor && !hasAttachedPrefix) {
            output = this.prefixWithSeparator(prefix, output, options);
            hasAttachedPrefix = true;
          }
          if (labelText) {
            const labelBg =
              "bg" +
              color.foreground.charAt(0).toUpperCase() +
              color.foreground.slice(1);
            const background = colorette[labelBg as keyof colorette.Colorette];
            if (!!background) {
              labelText = background(labelText);
            }
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
            if (labelText) {
              labelText = background(labelText);
            }
            prefix = background(prefix);
          }

          if (prefixColor?.foreground) {
            const foreground = colorette[prefixColor.foreground];
            if (labelText) {
              const labelBg =
                "bg" +
                prefixColor.foreground.charAt(0).toUpperCase() +
                prefixColor.foreground.slice(1);
              const background =
                colorette[labelBg as keyof colorette.Colorette];
              if (!!background) {
                labelText = background(labelText);
              }
            }
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
        if (labelText) {
          output = this.prefixWithSeparator(labelText, output, options);
        }
      } else if (labelText) {
        output = this.prefixWithSeparator(labelText, output, options);
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

      if (isError && text.stack) {
        const stack = text.stack.replace(/.*\n/, "").trimEnd();
        const stackLines = stack.split("\n");
        const stackSize = stackLines.length;
        output = `${output}\n${colorette.dim(
          stack
            .split("\n")
            .map(
              (line, idx) =>
                `  ${idx < stackSize - 1 ? "├─" : "└─"} ` +
                line.replace(/\s+at\s+/, " ").trim()
            )
            .join("\n")
        )}`;
      }

      if (onLog) {
        onLog(output);
      }

      if (labelText) {
        output = `\n${output}\n`;
      }

      this.log(output);
    };
  }

  private label(text: string | number) {
    return colorette.reset(`[${text}]`);
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
