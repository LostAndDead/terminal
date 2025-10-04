import { soundEnabled } from "../stores/sound";
import { get } from "svelte/store";
import { playSoundFile } from "../utils/sounds";

export const sudo = (args: string[]): string => {
  const fullCommand = args.length > 0 ? `sudo ${args.join(' ')}` : 'sudo';
  
  // Play the rick_roll sound effect only if sounds are enabled
  if (get(soundEnabled)) {
    try {
      playSoundFile('/sounds/rick_roll.wav', 0.3).catch(() => {}); // Ignore audio errors
    } catch (error) {
      // Ignore audio errors silently
    }
    return `Permission denied: unable to run the command '${fullCommand}' as root. Enjoy the music!`;
  } else {
    return `Permission denied: unable to run the command '${fullCommand}' as root.\n🔇 (Would have played rick roll sound, but sounds are disabled)`;
  }
};