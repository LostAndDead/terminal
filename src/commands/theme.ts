import themesData from "../../themes.json";
import * as packageJson from "../../package.json";
import { theme } from "../stores/theme";

const themes = themesData;

export const themeCommand = (args: string[]): string => {
  const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
  if (args.length === 0) {
    return usage;
  }

  switch (args[0]) {
    case "ls": {
      const themeNames = themes.map((t) => t.name.toLowerCase());
      
      // Format themes in columns with smart wrapping
      const maxLineLength = 80;
      const lines: string[] = [];
      let currentLine = '';
      
      for (const themeName of themeNames) {
        const addition = currentLine ? `, ${themeName}` : themeName;
        
        if (currentLine.length + addition.length > maxLineLength) {
          // Start a new line
          lines.push(currentLine);
          currentLine = themeName;
        } else {
          currentLine += addition;
        }
      }
      
      // Add the last line if it has content
      if (currentLine) {
        lines.push(currentLine);
      }
      
      let result = `Available themes (${themes.length} total):\n\n`;
      result += lines.join('\n');
      
      return result;
    }

    case "set": {
      if (args.length !== 2) {
        return usage;
      }

      const selectedTheme = args[1].toLowerCase();
      const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

      if (!t) {
        return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.
Available themes starting with '${selectedTheme.charAt(0)}': ${themes.filter(theme => theme.name.toLowerCase().startsWith(selectedTheme.charAt(0))).map(theme => theme.name.toLowerCase()).join(', ')}`;
      }

      theme.set(t);

      return `Theme set to ${selectedTheme}`;
    }

    default: {
      return usage;
    }
  }
};