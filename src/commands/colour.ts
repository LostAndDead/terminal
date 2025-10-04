import { 
  colourText, 
  parseColourArgs, 
  rainbowText, 
  gradientText,
  type ColouredOutput 
} from '../utils/colours';

export const colour = (args: string[]): ColouredOutput => {
  if (args.length === 0) {
    return `Usage: colour [options] <text>

Options:
  --colour=<hex>     Text colour (hex code or name)
  --bg=<hex>        Background colour (hex code or name)  
  --bold            Bold text
  --italic          Italic text
  --underline       Underlined text

Special effects:
  colour rainbow <text>                    Rainbow text
  colour gradient <start> <end> <text>     Gradient from start to end colour

Examples:
  colour --colour=#ff0000 "Red text"
  colour --colour=blue --bold "Bold blue text"
  colour --colour=#00ff00 --bg=#000000 "Green on black"
  colour rainbow "Rainbow text!"
  colour gradient red blue "Gradient text"

Supported colour names:
  red, green, blue, yellow, cyan, magenta, white, black, gray,
  orange, purple, pink, brown, lime, navy, teal, olive, maroon, silver`;
  }

  // Check for special effects
  if (args[0] === 'rainbow') {
    if (args.length < 2) {
      return colourText('Error: Please provide text for rainbow effect', '#ff0000');
    }
    const text = args.slice(1).join(' ');
    return rainbowText(text);
  }

  if (args[0] === 'gradient') {
    if (args.length < 4) {
      return colourText('Error: gradient requires start colour, end colour, and text', '#ff0000');
    }
    const [, startColour, endColour, ...textParts] = args;
    const text = textParts.join(' ');
    return gradientText(text, startColour, endColour);
  }

  // Parse colour arguments
  const parsed = parseColourArgs(args);
  
  if (parsed.remainingArgs.length === 0) {
    return colourText('Error: Please provide text to colour', '#ff0000');
  }

  const text = parsed.remainingArgs.join(' ');
  
  return colourText(text, parsed.colour, {
    backgroundColour: parsed.backgroundColour,
    bold: parsed.bold,
    italic: parsed.italic,
    underline: parsed.underline,
  });
};