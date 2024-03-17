import { tarsier, Color } from ".";

const logger = tarsier({
  types: {
    santa: {
      prefix: "🎅",
      color: {
        foreground: Color.Foreground.Red,
        style: Color.Style.Bold,
        samePrefixColor: true,
      },
    },
  },
});

logger.santa("Hello, world!");
logger.info("This is an info message");
