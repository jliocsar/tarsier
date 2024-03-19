var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// index.ts
import {stdout} from "node:process";

// node_modules/colorette/index.js
var exports_colorette = {};
__export(exports_colorette, {
  yellowBright: () => {
    {
      return yellowBright;
    }
  },
  yellow: () => {
    {
      return yellow;
    }
  },
  whiteBright: () => {
    {
      return whiteBright;
    }
  },
  white: () => {
    {
      return white;
    }
  },
  underline: () => {
    {
      return underline;
    }
  },
  strikethrough: () => {
    {
      return strikethrough;
    }
  },
  reset: () => {
    {
      return reset;
    }
  },
  redBright: () => {
    {
      return redBright;
    }
  },
  red: () => {
    {
      return red;
    }
  },
  magentaBright: () => {
    {
      return magentaBright;
    }
  },
  magenta: () => {
    {
      return magenta;
    }
  },
  italic: () => {
    {
      return italic;
    }
  },
  isColorSupported: () => {
    {
      return isColorSupported;
    }
  },
  inverse: () => {
    {
      return inverse;
    }
  },
  hidden: () => {
    {
      return hidden;
    }
  },
  greenBright: () => {
    {
      return greenBright;
    }
  },
  green: () => {
    {
      return green;
    }
  },
  gray: () => {
    {
      return gray;
    }
  },
  dim: () => {
    {
      return dim;
    }
  },
  cyanBright: () => {
    {
      return cyanBright;
    }
  },
  cyan: () => {
    {
      return cyan;
    }
  },
  createColors: () => {
    {
      return createColors;
    }
  },
  bold: () => {
    {
      return bold;
    }
  },
  blueBright: () => {
    {
      return blueBright;
    }
  },
  blue: () => {
    {
      return blue;
    }
  },
  blackBright: () => {
    {
      return blackBright;
    }
  },
  black: () => {
    {
      return black;
    }
  },
  bgYellowBright: () => {
    {
      return bgYellowBright;
    }
  },
  bgYellow: () => {
    {
      return bgYellow;
    }
  },
  bgWhiteBright: () => {
    {
      return bgWhiteBright;
    }
  },
  bgWhite: () => {
    {
      return bgWhite;
    }
  },
  bgRedBright: () => {
    {
      return bgRedBright;
    }
  },
  bgRed: () => {
    {
      return bgRed;
    }
  },
  bgMagentaBright: () => {
    {
      return bgMagentaBright;
    }
  },
  bgMagenta: () => {
    {
      return bgMagenta;
    }
  },
  bgGreenBright: () => {
    {
      return bgGreenBright;
    }
  },
  bgGreen: () => {
    {
      return bgGreen;
    }
  },
  bgCyanBright: () => {
    {
      return bgCyanBright;
    }
  },
  bgCyan: () => {
    {
      return bgCyan;
    }
  },
  bgBlueBright: () => {
    {
      return bgBlueBright;
    }
  },
  bgBlue: () => {
    {
      return bgBlue;
    }
  },
  bgBlackBright: () => {
    {
      return bgBlackBright;
    }
  },
  bgBlack: () => {
    {
      return bgBlack;
    }
  }
});
import * as tty from "tty";
var {
  env = {},
  argv = [],
  platform = ""
} = typeof process === "undefined" ? {} : process;
var isDisabled = "NO_COLOR" in env || argv.includes("--no-color");
var isForced = "FORCE_COLOR" in env || argv.includes("--color");
var isWindows = platform === "win32";
var isDumbTerminal = env.TERM === "dumb";
var isCompatibleTerminal = tty && tty.isatty && tty.isatty(1) && env.TERM && !isDumbTerminal;
var isCI = "CI" in env && (("GITHUB_ACTIONS" in env) || ("GITLAB_CI" in env) || ("CIRCLECI" in env));
var isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || isCI);
var replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close)) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace));
var clearBleed = (index, string, open, close, replace) => index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close;
var filterEmpty = (open, close, replace = open, at = open.length + 1) => (string) => string || !(string === "" || string === undefined) ? clearBleed(("" + string).indexOf(close, at), string, open, close, replace) : "";
var init = (open, close, replace) => filterEmpty(`\x1B[${open}m`, `\x1B[${close}m`, replace);
var colors = {
  reset: init(0, 0),
  bold: init(1, 22, "\x1B[22m\x1B[1m"),
  dim: init(2, 22, "\x1B[22m\x1B[2m"),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49),
  blackBright: init(90, 39),
  redBright: init(91, 39),
  greenBright: init(92, 39),
  yellowBright: init(93, 39),
  blueBright: init(94, 39),
  magentaBright: init(95, 39),
  cyanBright: init(96, 39),
  whiteBright: init(97, 39),
  bgBlackBright: init(100, 49),
  bgRedBright: init(101, 49),
  bgGreenBright: init(102, 49),
  bgYellowBright: init(103, 49),
  bgBlueBright: init(104, 49),
  bgMagentaBright: init(105, 49),
  bgCyanBright: init(106, 49),
  bgWhiteBright: init(107, 49)
};
var createColors = ({ useColor = isColorSupported } = {}) => useColor ? colors : Object.keys(colors).reduce((colors2, key) => ({ ...colors2, [key]: String }), {});
var {
  reset,
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  blackBright,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
  bgBlackBright,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright
} = createColors();

// index.ts
function tarsier(options) {
  return new Tarsier(options);
}
var Style = {
  Bold: "bold",
  Dim: "dim",
  Hidden: "hidden",
  Inverse: "inverse",
  Underline: "underline",
  Strikethrough: "strikethrough",
  Italic: "italic",
  Reset: "reset"
};
var BackgroundColor = {
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
  WhiteBright: "bgWhiteBright"
};
var ForegroundColor = {
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
  Gray: "gray"
};
var Color = {
  Style,
  Background: BackgroundColor,
  Foreground: ForegroundColor
};

class Tarsier {
  defaultLogTypes = {
    error: {
      label: true,
      color: {
        foreground: ForegroundColor.RedBright,
        style: Style.Bold,
        samePrefixColor: true
      }
    },
    info: {
      label: true,
      color: {
        foreground: ForegroundColor.BlueBright
      }
    },
    success: {
      label: true,
      color: {
        foreground: ForegroundColor.GreenBright
      }
    },
    warn: {
      label: true,
      color: {
        foreground: ForegroundColor.YellowBright,
        style: Style.Bold
      }
    }
  };
  options;
  constructor(options) {
    this.options = {
      ...options,
      types: {
        ...this.defaultLogTypes,
        ...options?.types
      }
    };
    const logTypes = Object.entries(this.options.types);
    for (const [logTypeName, logType] of logTypes) {
      this[logTypeName] = this.build(logTypeName, logType);
    }
  }
  build(typeName, options) {
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
      onLog = null
    } = options;
    return (text) => {
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
          const background = exports_colorette[color.background];
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
          const foreground = exports_colorette[color.foreground];
          if (prefix && color.samePrefixColor && !hasAttachedPrefix) {
            output = this.prefixWithSeparator(prefix, output, options);
            hasAttachedPrefix = true;
          }
          if (labelText) {
            const labelBg = "bg" + color.foreground.charAt(0).toUpperCase() + color.foreground.slice(1);
            const background = exports_colorette[labelBg];
            if (!!background) {
              labelText = background(labelText);
            }
          }
          output = foreground(output);
        }
        if (color.style) {
          if (Array.isArray(color.style)) {
            for (const logColorStyle of color.style) {
              const style = exports_colorette[logColorStyle];
              output = style(output);
            }
          } else {
            const style = exports_colorette[color.style];
            output = style(output);
          }
        }
      }
      if (prefix && !hasAttachedPrefix) {
        if (beforePrefix) {
          prefix = beforePrefix(prefix);
        }
        if (color && "prefixColor" in color) {
          const prefixColor = color.prefixColor;
          if (prefixColor?.background) {
            const background = exports_colorette[prefixColor.background];
            if (labelText) {
              labelText = background(labelText);
            }
            prefix = background(prefix);
          }
          if (prefixColor?.foreground) {
            const foreground = exports_colorette[prefixColor.foreground];
            if (labelText) {
              const labelBg = "bg" + prefixColor.foreground.charAt(0).toUpperCase() + prefixColor.foreground.slice(1);
              const background = exports_colorette[labelBg];
              if (!!background) {
                labelText = background(labelText);
              }
            }
            prefix = foreground(prefix);
          }
          if (prefixColor?.style) {
            if (Array.isArray(prefixColor.style)) {
              for (const logColorStyle of prefixColor.style) {
                const style = exports_colorette[logColorStyle];
                prefix = style(prefix);
              }
            } else {
              const style = exports_colorette[prefixColor.style];
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
        const timestamp = new Date().toISOString().replace(/Z$/, "").replace("T", " ");
        output = this.prefixWithSeparator(this.label(timestamp), output, options);
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
        output = `${output}\n${dim(stack.split("\n").map((line, idx) => `  ${idx < stackSize - 1 ? "\u251C\u2500" : "\u2514\u2500"} ` + line.replace(/\s+at\s+/, " ").trim()).join("\n"))}`;
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
  label(text) {
    return reset(`[${text}]`);
  }
  log(text) {
    stdout.write(`${text}\n`);
  }
  prefixWithSeparator(prefix, text, options) {
    if (options.removeSeparator) {
      return `${prefix}${text}`;
    }
    const separator = "separator" in options ? options.separator : " ";
    return `${prefix}${separator}${text}`;
  }
}
export {
  tarsier,
  Style,
  ForegroundColor,
  Color,
  BackgroundColor
};
