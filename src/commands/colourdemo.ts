import { 
  colourText, 
  rainbowText, 
  gradientText,
  type ColouredOutput 
} from '../utils/colours';

export const colourdemo = (): ColouredOutput => {
  return [
    colourText('🎨 Colour Demo - Terminal Text Styling\n\n', '#ffff00', { bold: true }),
    
    colourText('Basic Colours:\n', '#ffffff', { bold: true }),
    colourText('Red text', '#ff0000'), ' | ',
    colourText('Green text', '#00ff00'), ' | ',
    colourText('Blue text', '#0000ff'), ' | ',
    colourText('Yellow text', '#ffff00'), '\n',
    
    colourText('Purple text', '#800080'), ' | ',
    colourText('Cyan text', '#00ffff'), ' | ',
    colourText('Orange text', '#ffa500'), ' | ',
    colourText('Pink text', '#ffc0cb'), '\n\n',
    
    colourText('Text Styles:\n', '#ffffff', { bold: true }),
    colourText('Bold text', '#ffffff', { bold: true }), ' | ',
    colourText('Italic text', '#ffffff', { italic: true }), ' | ',
    colourText('Underlined text', '#ffffff', { underline: true }), '\n',
    colourText('Bold + Italic', '#ffff00', { bold: true, italic: true }), ' | ',
    colourText('All styles!', '#ff0000', { bold: true, italic: true, underline: true }), '\n\n',
    
    colourText('Background Colours:\n', '#ffffff', { bold: true }),
    colourText(' White on Black ', '#ffffff', { backgroundColour: '#000000' }), ' ',
    colourText(' Black on White ', '#000000', { backgroundColour: '#ffffff' }), ' ',
    colourText(' Green on Dark ', '#00ff00', { backgroundColour: '#004400' }), '\n',
    colourText(' Red Alert! ', '#ffffff', { backgroundColour: '#ff0000', bold: true }), ' ',
    colourText(' Success! ', '#ffffff', { backgroundColour: '#00aa00', bold: true }), '\n\n',
    
    colourText('Special Effects:\n', '#ffffff', { bold: true }),
    'Rainbow: ', ...rainbowText('Rainbow Text Effect!'), '\n',
    'Gradient: ', ...gradientText('Gradient from Red to Blue!', '#ff0000', '#0000ff'), '\n',
    'Fire: ', ...gradientText('Fire Effect!', '#ff0000', '#ffff00'), '\n\n',
    
    colourText('Usage Examples:\n', '#ffffff', { bold: true }),
    colourText('colour --colour=#ff0000 "Red text"', '#888888'), '\n',
    colourText('colour --colour=blue --bold "Bold blue"', '#888888'), '\n',
    colourText('colour --bg=#000000 --colour=#00ff00 "Matrix style"', '#888888'), '\n',
    colourText('colour rainbow "Rainbow text"', '#888888'), '\n',
    colourText('colour gradient red blue "Gradient text"', '#888888'), '\n',
    colourText('echo --colour=#ff00ff --bold "Coloured echo"', '#888888'), '\n\n',
    
    colourText('Pro tip: ', '#ffff00', { bold: true }),
    colourText('Use hex codes like #ff0000 or colour names like "red"!', '#ffffff'),
  ];
};