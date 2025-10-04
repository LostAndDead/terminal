import type { ColouredOutput } from '../utils/colours';

export interface Command {
  command: string;
  outputs: (string | ColouredOutput)[];
}
