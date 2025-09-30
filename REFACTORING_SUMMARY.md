# Command Structure Refactoring

## Overview
I've successfully started the refactoring of your terminal commands into separate files for better organization and maintainability.

## New Structure

### `/src/commands/` Directory
- **`types.ts`** - Command interfaces and type definitions
- **`index.ts`** - Central command registry that imports and exports all commands
- **Individual command files:**
  - `beans.ts` - Simple bean emoji command
  - `cd.ts` - Directory navigation with gaming references
  - `date.ts` - Current date/time display
  - `echo.ts` - Echo arguments
  - `editors.ts` - vi/vim/emacs editor jokes
  - `help.ts` - Command help system
  - `hostname.ts` - Current hostname display
  - `info.ts` - About and contact commands
  - `ls.ts` - Fake file system listing with gaming references
  - `man.ts` - ASCII art man page
  - `whoami.ts` - "who are you?" with sound effect

### Benefits of This Approach
1. **Modularity** - Each command is in its own file
2. **Maintainability** - Easy to find and edit specific commands
3. **Type Safety** - Consistent typing across all commands
4. **Extensibility** - Easy to add new commands
5. **Testing** - Each command can be tested independently

## Current Status

### ✅ Completed
- Created command directory structure
- Extracted 12 simple commands into separate files
- Created command registry system
- Updated main commands.ts to use registry

### 🚧 In Progress
- The main commands.ts still contains complex commands that need dependencies
- These commands require imports like themes, sounds, stores, etc.

### 📋 Next Steps (if you want to continue)
1. Extract remaining complex commands:
   - `rm.ts` - Dangerous command detection with jokes
   - `sudo.ts` - Permission denied with Rick Roll
   - `theme.ts` - Theme management (needs themes data)
   - `clear.ts` - History clearing (needs history store)
   - `email.ts` - Email functionality
   - `exit.ts` - Exit functionality
   - `banner.ts` - Terminal banner
   - `todo.ts` - Todo management (needs todo manager)
   - `weather.ts` - Weather API calls
   - `curl.ts` - HTTP requests
   - `play.ts` - Sound system (needs sounds utility)
   - `neofetch.ts` - System info display

## Usage
Commands are now imported from the registry and work exactly the same as before:
```typescript
import { commandRegistry } from "../commands";
export const commands = {
  ...commandRegistry,
  // Additional complex commands...
};
```

## File Organization
```
src/
├── commands/
│   ├── index.ts          # Central registry
│   ├── types.ts          # Type definitions
│   ├── beans.ts          # Individual commands
│   ├── cd.ts
│   ├── date.ts
│   ├── echo.ts
│   ├── editors.ts
│   ├── help.ts
│   ├── hostname.ts
│   ├── info.ts
│   ├── ls.ts
│   ├── man.ts
│   └── whoami.ts
└── utils/
    └── commands.ts       # Main command handler (now uses registry)
```

The refactoring maintains all existing functionality while providing a much cleaner and more maintainable code structure!