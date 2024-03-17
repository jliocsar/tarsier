import { tarsier, Color } from ".";

const logger = tarsier({
  types: {
    grinch: {
      prefix: "🎄",
      color: {
        foreground: Color.Foreground.Green,
        style: Color.Style.Bold,
      },
    },
    santa: {
      prefix: "🎅",
      color: {
        foreground: Color.Foreground.Red,
        style: Color.Style.Bold,
      },
    },
  },
});

logger.santa("Ho ho ho");
logger.grinch("I hate Christmas");
