/**
 * Colour utility for terminal output
 * Supports hex colour codes and basic colour names
 */

export interface ColouredText {
  text: string;
  colour?: string;
  backgroundColour?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export type ColouredOutput = string | ColouredText | (string | ColouredText)[];

/**
 * Convert hex colour to valid CSS colour
 */
export function normaliseColour(colour: string): string {
  // Remove # if present and validate hex
  const hex = colour.replace(/^#/, '');
  
  // Check if it's a valid 3 or 6 digit hex
  if (/^[0-9A-Fa-f]{3}$/.test(hex)) {
    // Convert 3-digit to 6-digit hex
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  } else if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
    return `#${hex}`;
  }
  
  // Check if it's a named colour
  const namedColours: Record<string, string> = {
    'red': '#ff0000',
    'green': '#00ff00',
    'blue': '#0000ff',
    'yellow': '#ffff00',
    'cyan': '#00ffff',
    'magenta': '#ff00ff',
    'white': '#ffffff',
    'black': '#000000',
    'gray': '#808080',
    'grey': '#808080',
    'orange': '#ffa500',
    'purple': '#800080',
    'pink': '#ffc0cb',
    'brown': '#a52a2a',
    'lime': '#00ff00',
    'navy': '#000080',
    'teal': '#008080',
    'silver': '#c0c0c0',
    'maroon': '#800000',
    'olive': '#808000',
    'aqua': '#00ffff',
    'fuchsia': '#ff00ff',
  };
  
  return namedColours[colour.toLowerCase()] || colour;
}

/**
 * Create coloured text object
 */
export function colourText(
  text: string, 
  colour?: string, 
  options?: {
    backgroundColour?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  }
): ColouredText {
  return {
    text,
    colour: colour ? normaliseColour(colour) : undefined,
    backgroundColour: options?.backgroundColour ? normaliseColour(options.backgroundColour) : undefined,
    bold: options?.bold,
    italic: options?.italic,
    underline: options?.underline,
  };
}

/**
 * Convert coloured output to HTML for rendering
 */
export function renderColouredOutput(output: ColouredOutput): string {
  if (typeof output === 'string') {
    return output;
  }
  
  if (Array.isArray(output)) {
    return output.map(item => renderColouredOutput(item)).join('');
  }
  
  // Single coloured text
  const styles: string[] = [];
  
  if (output.colour) {
    styles.push(`color: ${output.colour}`);
  }
  
  if (output.backgroundColour) {
    styles.push(`background-color: ${output.backgroundColour}`);
  }
  
  if (output.bold) {
    styles.push('font-weight: bold');
  }
  
  if (output.italic) {
    styles.push('font-style: italic');
  }
  
  if (output.underline) {
    styles.push('text-decoration: underline');
  }
  
  if (styles.length === 0) {
    return output.text;
  }
  
  return `<span style="${styles.join('; ')}">${output.text}</span>`;
}

/**
 * Parse colour arguments from command line
 */
export function parseColourArgs(args: string[]): {
  remainingArgs: string[];
  colour?: string;
  backgroundColour?: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
} {
  const result = {
    remainingArgs: [] as string[],
    colour: undefined as string | undefined,
    backgroundColour: undefined as string | undefined,
    bold: false,
    italic: false,
    underline: false,
  };
  
  for (const arg of args) {
    if (arg.startsWith('--colour=')) {
      result.colour = normaliseColour(arg.substring(9));
    } else if (arg.startsWith('--bg=')) {
      result.backgroundColour = normaliseColour(arg.substring(5));
    } else if (arg === '--bold') {
      result.bold = true;
    } else if (arg === '--italic') {
      result.italic = true;
    } else if (arg === '--underline') {
      result.underline = true;
    } else {
      result.remainingArgs.push(arg);
    }
  }
  
  return result;
}

/**
 * Create a rainbow text effect
 */
export function rainbowText(text: string): ColouredText[] {
  const colours = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#0080ff', '#8000ff', '#ff00ff'];
  return text.split('').map((char, index) => ({
    text: char,
    colour: colours[index % colours.length],
  }));
}

/**
 * Create a gradient text effect
 */
export function gradientText(text: string, startColour: string, endColour: string): ColouredText[] {
  const start = hexToRgb(normaliseColour(startColour));
  const end = hexToRgb(normaliseColour(endColour));
  
  if (!start || !end) {
    return [{ text, colour: startColour }];
  }
  
  const length = text.length;
  return text.split('').map((char, index) => {
    const ratio = length > 1 ? index / (length - 1) : 0;
    const r = Math.round(start.r + (end.r - start.r) * ratio);
    const g = Math.round(start.g + (end.g - start.g) * ratio);
    const b = Math.round(start.b + (end.b - start.b) * ratio);
    
    return {
      text: char,
      colour: `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`,
    };
  });
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}