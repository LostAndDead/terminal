// Dynamic sound loader using Vite's import.meta.glob
export interface SoundGroup {
  [key: string]: string[];
}

interface SoundPlayState {
  [soundName: string]: {
    queue: string[];
    lastPlayed?: string;
  };
}

let soundsCache: SoundGroup | null = null;

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getSoundPlayState(): SoundPlayState {
  try {
    const stored = localStorage.getItem('terminal-sound-state');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
}

function setSoundPlayState(state: SoundPlayState): void {
  try {
    localStorage.setItem('terminal-sound-state', JSON.stringify(state));
  } catch (error) {
    console.warn('Could not save sound state to localStorage:', error);
  }
}

export function loadSounds(): SoundGroup {
  if (soundsCache) {
    return soundsCache;
  }

  const sounds: SoundGroup = {};
  
  // Use Vite's import.meta.glob to get all audio files
  const audioFiles = import.meta.glob('/public/sounds/**/*.{mp3,wav,ogg,m4a}', { 
    query: '?url',
    import: 'default',
    eager: true 
  });

  for (const [filePath, url] of Object.entries(audioFiles)) {
    // Extract filename from path: /public/sounds/turrets/example-1.wav -> example-1.wav
    const fileName = filePath.split('/').pop()?.replace(/\.(mp3|wav|ogg|m4a)$/i, '') || '';
    
    // Extract base name (remove -1, -2, etc.): example-1 -> example
    const baseMatch = fileName.match(/^(.+?)(?:-\d+)?$/);
    const baseName = baseMatch ? baseMatch[1].toLowerCase() : fileName.toLowerCase();
    
    // Fix the URL by removing /public from the start
    let fixedUrl = url as string;
    if (fixedUrl.startsWith('/public/')) {
      fixedUrl = fixedUrl.replace('/public/', '/');
    }
    
    if (!sounds[baseName]) {
      sounds[baseName] = [];
    }
    sounds[baseName].push(fixedUrl);
  }

  soundsCache = sounds;
  return sounds;
}

export function getRandomSound(soundName: string): string | null {
  const sounds = loadSounds();
  const group = sounds[soundName.toLowerCase()];
  
  if (!group || group.length === 0) {
    return null;
  }

  // If only one sound, just return it
  if (group.length === 1) {
    return group[0];
  }

  const playState = getSoundPlayState();
  const soundKey = soundName.toLowerCase();
  
  // Initialize or refresh the queue if needed
  if (!playState[soundKey] || playState[soundKey].queue.length === 0) {
    // Create a shuffled queue, but ensure the last played sound isn't first
    let shuffledQueue = shuffleArray(group);
    
    // If we have a last played sound, make sure it's not first in the new queue
    if (playState[soundKey]?.lastPlayed && shuffledQueue[0] === playState[soundKey].lastPlayed) {
      // Swap the first element with a random other element
      const swapIndex = Math.floor(Math.random() * (shuffledQueue.length - 1)) + 1;
      [shuffledQueue[0], shuffledQueue[swapIndex]] = [shuffledQueue[swapIndex], shuffledQueue[0]];
    }
    
    playState[soundKey] = {
      queue: shuffledQueue,
      lastPlayed: playState[soundKey]?.lastPlayed
    };
  }

  // Get the next sound from the queue
  const nextSound = playState[soundKey].queue.shift()!;
  playState[soundKey].lastPlayed = nextSound;
  
  // Save the updated state
  setSoundPlayState(playState);
  
  return nextSound;
}

export function getSoundNames(): string[] {
  const sounds = loadSounds();
  return Object.keys(sounds);
}

/**
 * Play a sound with optional volume control and error handling
 * @param soundName - Name of the sound group to play from
 * @param volume - Volume level (0.0 to 1.0), defaults to 0.3
 * @returns Promise that resolves when sound starts playing
 */
export async function playSound(soundName: string, volume: number = 0.3): Promise<void> {
  const soundFile = getRandomSound(soundName);
  
  if (!soundFile) {
    throw new Error(`Sound '${soundName}' not found`);
  }

  const audio = new Audio(soundFile);
  audio.volume = volume;
  await audio.play();
}

/**
 * Play a specific sound file by path
 * @param soundPath - Direct path to the sound file
 * @param volume - Volume level (0.0 to 1.0), defaults to 0.3
 * @returns Promise that resolves when sound starts playing
 */
export async function playSoundFile(soundPath: string, volume: number = 0.3): Promise<void> {
  const audio = new Audio(soundPath);
  audio.volume = volume;
  await audio.play();
}