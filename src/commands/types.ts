import type { ColouredOutput } from '../utils/colours';

export interface Command {
  name: string;
  description: string;
  category: string;
  execute: (args: string[]) => Promise<string | ColouredOutput> | string | ColouredOutput;
}

export type CommandFunction = (args: string[]) => Promise<string | ColouredOutput> | string | ColouredOutput;