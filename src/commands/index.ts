import type { CommandFunction } from './types';

// Import all command functions that are already created
import { help } from './help';
import { beans } from './beans';
import { cd } from './cd';
import { ls } from './ls';
import { about, contact } from './info';
import { hostname } from './hostname';
import { date } from './date';
import { vi, vim, emacs } from './editors';
import { echo } from './echo';
import { man } from './man';
import { whoami } from './whoami';
import { rm } from './rm';
import { sudo } from './sudo';
import { themeCommand } from './theme';
import { repo } from './repo';
import { clear } from './clear';
import { email } from './email';
import { exit } from './exit';
import { weather } from './weather';
import { curl } from './curl';
import { banner } from './banner';
import { todo } from './todo';
import { play } from './play';
import { neofetch } from './neofetch';
import { teapot } from './teapot';
import { colour } from './colour';
import { colourdemo } from './colourdemo';
import { crt } from './crt';
import { sound } from './sound';

// Complete command registry with all extracted commands
export const commandRegistry: Record<string, CommandFunction> = {
  // Information commands
  help,
  about,
  contact,
  man,
  neofetch,
  
  // System commands
  date,
  echo,
  hostname,
  whoami,
  clear,
  exit,
  banner,
  
  // File system commands
  ls,
  cd,
  rm,
  
  // Privilege commands
  sudo,
  
  // Customization commands
  theme: themeCommand, // Note: renamed to avoid conflict with store
  colour,
  crt,
  sound,
  
  // Productivity commands
  todo,
  weather,
  
  // Network commands
  curl,
  
  // Contact commands
  email,
  repo,
  
  // Fun commands
  beans,
  play,
  teapot,
  colourdemo,
  
  // Editor commands
  vi,
  vim,
  emacs,
};

// Export individual commands for testing or direct use
export {
  help,
  beans,
  cd,
  ls,
  about,
  contact,
  hostname,
  date,
  vi,
  vim,
  emacs,
  echo,
  man,
  whoami,
  rm,
  sudo,
  themeCommand,
  repo,
  clear,
  email,
  exit,
  weather,
  curl,
  banner,
  todo,
  play,
  neofetch,
  colour,
  colourdemo,
};