import { soundEnabled } from "../stores/sound";
import { get } from "svelte/store";
import { playSoundFile } from "../utils/sounds";

export const whoami = async (): Promise<string> => {
  // Play the who_are_you sound effect only if sounds are enabled
  if (get(soundEnabled)) {
    try {
      playSoundFile('/sounds/turrets/who_are_you.wav', 0.3).catch(() => {}); // Ignore audio errors
    } catch (error) {
      // Ignore audio errors silently
    }
    return "who are you?";
  } else {
    return "who are you? 🔇 (Would have played turret sound, but sounds are disabled)";
  }
};