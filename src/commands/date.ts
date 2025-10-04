import { colourText, type ColouredOutput } from '../utils/colours';

export const date = (): ColouredOutput => {
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  
  return [
    colourText(dateStr, '#00bfff'), // Blue for date
    ' ',
    colourText(timeStr, '#00ff80')  // Green for time
  ];
};