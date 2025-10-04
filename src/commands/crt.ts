import { crtEnabled } from "../stores/crt";
import { get } from "svelte/store";

export const crt = (args: string[]): string => {
  const usage = `Usage: crt [command]

Commands:
  on      - Enable CRT effect
  off     - Disable CRT effect
  toggle  - Toggle CRT effect on/off
  status  - Show current CRT effect status

Examples:
  crt on
  crt off
  crt toggle
  crt status`;

  if (args.length === 0) {
    return usage;
  }

  switch (args[0].toLowerCase()) {
    case "on":
      crtEnabled.set(true);
      return "CRT effect enabled";

    case "off":
      crtEnabled.set(false);
      return "CRT effect disabled";

    case "toggle":
      const currentState = get(crtEnabled);
      crtEnabled.set(!currentState);
      return `CRT effect ${!currentState ? "enabled" : "disabled"}`;

    case "status":
      const isEnabled = get(crtEnabled);
      return `CRT effect is currently ${isEnabled ? "enabled" : "disabled"}`;

    default:
      return `Unknown command: ${args[0]}\n\n${usage}`;
  }
};