export const whoami = async (): Promise<string> => {
  // Play the who_are_you sound effect
  try {
    const audio = new Audio('/sounds/turrets/who_are_you.wav');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore audio errors
  } catch (error) {
    // Ignore audio errors silently
  }
  
  return "who are you?";
};