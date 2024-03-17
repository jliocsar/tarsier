# Tarsier 🌒

**W.I.P.**

Tarsier is yet another logging library for Node.js/Bun.

It's intended to be fast, highly customizable and just pretty.

If you need a more complex JSON logger, you should check out [pino](https://github.com/pinojs/pino) instead.

Tarsier was highly inspired by [Signale](https://github.com/klaudiosinani/signale), which still might be a better option for you.

## Installing

```sh
npm i -D tarsierjs
yarn add -D tarsierjs
pnpm add -D tarsierjs
bun add -D tarsierjs
```

## Usage

```ts
import { tarsier, Color } from "tarsierjs";

const logger = tarsier({
  types: {
    santa: {
      level: "info",
      prefix: "🎅",
      disabled: process.env.DISABLE_SANTA,
      color: {
        foreground: Color.Foreground.Red,
        style: Color.Style.Bold,
      },
    },
    grinch: {
      level: "warn",
      prefix: "🎄",
      color: {
        foreground: Color.Foreground.Green,
        style: Color.Style.Bold,
      },
    },
  },
});

logger.santa("Ho ho ho");
logger.grinch("I hate Christmas");
```
