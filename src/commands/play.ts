import { getSoundNames, playSound } from "../utils/sounds";
import { soundEnabled } from "../stores/sound";
import { get } from "svelte/store";

export const play = async (args: string[]): Promise<string> => {
  // Check if sounds are enabled
  if (!get(soundEnabled)) {
    return "🔇 Sounds are currently disabled. Use 'sound on' to enable sounds.";
  }

  // Load sounds dynamically
  const soundNames = getSoundNames();
  
  const usage = `Usage: play [sound]

Available sounds:
${soundNames.length > 0 ? soundNames.map(name => `  ${name}`).join('\n') : '  No sounds found'}

Examples:
  play ${soundNames[0] || 'example'}
`;

  if (args.length === 0) {
    return usage;
  }

  const soundName = args[0].toLowerCase();

  try {
    await playSound(soundName, 0.3);
    return `♪ Playing ${soundName}...`;
  } catch (error) {
    return `Sound '${soundName}' not found. Try 'play' without arguments to see available sounds.`;
  }
};