import { tarsier, Color } from ".";

const logger = tarsier({
  types: {
    santa: {
      prefix: "🎅",
      color: {
        foreground: Color.Foreground.Red,
        style: Color.Style.Bold,
      },
    },
  },
});

logger.santa("Ho ho ho!");
