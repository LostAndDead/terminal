import { parseColourArgs, colourText, type ColouredOutput } from '../utils/colours';

export const echo = (args: string[]): string | ColouredOutput => {
  if (args.length === 0) {
    return "";
  }

  // Check if any colour arguments are present
  const hasColourArgs = args.some(arg => 
    arg.startsWith('--colour=') || 
    arg.startsWith('--bg=') || 
    arg === '--bold' || 
    arg === '--italic' || 
    arg === '--underline'
  );

  if (!hasColourArgs) {
    // Standard echo behavior
    return args.join(" ");
  }

  // Parse colour arguments
  const parsed = parseColourArgs(args);
  
  if (parsed.remainingArgs.length === 0) {
    return "";
  }

  const text = parsed.remainingArgs.join(' ');
  
  return colourText(text, parsed.colour, {
    backgroundColour: parsed.backgroundColour,
    bold: parsed.bold,
    italic: parsed.italic,
    underline: parsed.underline,
  });
};