# Copilot Instructions for Terminal Web App

## Project Architecture

This is a **Svelte + TypeScript terminal emulator** that runs in the browser. It simulates a Unix-like command interface with custom commands, themes, and persistent state.

### Core Components
- **Terminal Interface**: `App.svelte` orchestrates `History.svelte`, `Ps1.svelte`, and `Input.svelte`
- **Command System**: All commands are defined in `src/utils/commands.ts` as a `Record<string, Function>`
- **State Management**: Svelte stores in `src/stores/` with automatic localStorage persistence
- **Theming**: 180+ terminal color schemes loaded from `themes.json` at build time

## Key Patterns

### Command Implementation
Commands follow this pattern in `src/utils/commands.ts`:
```typescript
export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  mycommand: (args: string[]) => {
    // Return string output or Promise<string> for async operations
    return "Command output";
  }
};
```

### Store Pattern with Persistence
All stores auto-sync to localStorage:
```typescript
export const myStore = writable<Type>(
  JSON.parse(localStorage.getItem('key') || 'defaultValue')
);
myStore.subscribe((value) => {
  localStorage.setItem('key', JSON.stringify(value));
});
```

### Theme System
- Themes are static JSON loaded at build time from `themes.json`
- Theme interface defined in `src/interfaces/theme.ts` with 19 color properties
- Applied dynamically via inline styles: `style={background-color: ${$theme.background}}`

## Development Workflow

### Local Development
```bash
npm run dev          # Start dev server on port 3000
npm run build        # Production build to dist/
npm run preview      # Preview production build
npm run check        # TypeScript/Svelte validation
```

### Docker Deployment
- Multi-stage build: dependencies → builder → static web server
- Uses `lipanski/docker-static-website` for production serving
- Port 3000 exposed, configured via `httpd.conf`

### Component Structure
- **Input.svelte**: Handles command parsing, history navigation (↑↓), tab completion, and keyboard shortcuts (Ctrl+L)
- **History.svelte**: Renders command history from store with PS1 prompts
- **Ps1.svelte**: Terminal prompt component (reused in history and current input)

## Adding Features

### New Commands
1. Add to `src/utils/commands.ts` exports object
2. Include in help categories for discoverability
3. Follow naming convention: lowercase, hyphenated for multi-word

### New Themes
- Add theme objects to `themes.json` following the 19-property interface
- Reference existing themes for color property naming consistency

### Analytics Integration
- Uses environment variables: `VITE_TRACKING_ENABLED`, `VITE_TRACKING_SITE_ID`, `VITE_TRACKING_URL`
- Tracking calls made in `Input.svelte` on command execution via `src/utils/tracking.ts`

## Project-Specific Conventions

- **No React/Vue**: Pure Svelte with minimal external dependencies
- **Static Import**: `themes.json` and `package.json` imported statically (not fetch)
- **Command Registration**: All commands must be in the main exports object (no dynamic loading)
- **TypeScript Strict**: All components use `<script lang="ts">` with interface definitions
- **Mobile-First**: Responsive design with hidden/visible classes for mobile vs desktop PS1
- **localStorage First**: No backend - all persistence through browser storage

## Testing & Validation
- Run `npm run check` for TypeScript validation
- Test command functionality through the browser interface
- Verify theme switching via `theme ls` and `theme set <name>` commands
- Check Docker build with `docker-compose up` for deployment validation