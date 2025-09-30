export const sudo = (args: string[]): string => {
  // Play the rick_roll sound effect
  try {
    const audio = new Audio('/sounds/turrets/rick_roll.wav');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Ignore audio errors
  } catch (error) {
    // Ignore audio errors silently
  }

  // Delayed YouTube link opening for extra trolling
  setTimeout(() => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  }, 2000);

  return `Permission denied: unable to run the command '${args[0]}' as root. Enjoy the music!`;
};