import { getSoundNames, getRandomSound } from "../utils/sounds";

export const play = async (args: string[]): Promise<string> => {
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
  const soundFile = getRandomSound(soundName);

  if (!soundFile) {
    return `Sound '${soundName}' not found. Try 'play' without arguments to see available sounds.`;
  }

  try {
    const audio = new Audio(soundFile);
    audio.volume = 0.3; // Set volume to 30% to avoid being too loud
    
    // Try to play the audio file
    await audio.play();
    return `♪ Playing ${soundName}... (${soundFile})`;
    
  } catch (error) {
    return `Error: Could not play '${soundName}'. Make sure ${soundFile} exists and is accessible.`;
  }
};