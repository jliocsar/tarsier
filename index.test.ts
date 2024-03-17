import { tarsier, Color } from ".";

const logger = tarsier({
  types: {
    santa: {
      level: "info",
      prefix: "🎅",
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

logger.error(new Error("Something went wrong here!"));
logger.info("Santa is coming to town!");
logger.santa("Ho ho ho!");
logger.grinch("I hate Christmas!");
