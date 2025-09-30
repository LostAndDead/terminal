export interface Command {
  name: string;
  description: string;
  category: string;
  execute: (args: string[]) => Promise<string> | string;
}

export type CommandFunction = (args: string[]) => Promise<string> | string;