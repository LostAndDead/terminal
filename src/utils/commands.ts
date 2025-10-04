import { history } from "../stores/history";
// Import commands from the new registry
import { commandRegistry } from "../commands";
import type { ColouredOutput } from "./colours";

// All commands are now extracted to separate files and imported via the registry
export const commands: Record<string, (args: string[]) => Promise<string | ColouredOutput> | string | ColouredOutput> = {
  // Import all the extracted commands
  ...commandRegistry,

  // Override the clear command to handle the banner auto-run behavior
  clear: () => {
    history.set([]);

    // Automatically run banner after clear
    const bannerCommand = commandRegistry['banner'] as () => string;
    if (bannerCommand) {
      const bannerOutput = bannerCommand();
      history.set([{ command: 'banner', outputs: [bannerOutput] }]);
    }

    return "";
  },
};
