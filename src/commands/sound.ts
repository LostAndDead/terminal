import { soundEnabled } from "../stores/sound";
import { get } from "svelte/store";

export const sound = (args: string[]): string => {
  const usage = `Usage: sound [command]

Commands:
  on      - Enable all sounds
  off     - Disable all sounds
  toggle  - Toggle sounds on/off
  status  - Show current sound status

Examples:
  sound on
  sound off
  sound toggle
  sound status`;

  if (args.length === 0) {
    return usage;
  }

  switch (args[0].toLowerCase()) {
    case "on":
      soundEnabled.set(true);
      return "🔊 Sounds enabled";

    case "off":
      soundEnabled.set(false);
      return "🔇 Sounds disabled";

    case "toggle":
      const currentState = get(soundEnabled);
      soundEnabled.set(!currentState);
      return `${!currentState ? "🔊" : "🔇"} Sounds ${!currentState ? "enabled" : "disabled"}`;

    case "status":
      const isEnabled = get(soundEnabled);
      return `Sounds are currently ${isEnabled ? "🔊 enabled" : "🔇 disabled"}`;

    default:
      return `Unknown command: ${args[0]}\n\n${usage}`;
  }
};