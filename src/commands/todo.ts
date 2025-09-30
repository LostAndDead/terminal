import { todoManager } from "../utils/todo";

export const todo = (args: string[]): string => {
  const usage = `Usage: todo [command] [args]

Commands:
  add <text>     Add a new todo
  ls [filter]    List todos (filter: all, completed, pending)
  done <id>      Mark todo as completed
  rm <id>        Remove a todo
  clear [completed]  Clear todos (add 'completed' to clear only completed)
  stats          Show todo statistics

Examples:
  todo add Buy groceries
  todo ls
  todo ls pending
  todo done 1
  todo rm 2
  todo clear completed`;

  if (args.length === 0) {
    return usage;
  }

  const [subCommand, ...subArgs] = args;

  switch (subCommand) {
    case "add":
      if (subArgs.length === 0) {
        return "Error: Please provide todo text. Example: todo add Buy milk";
      }
      return todoManager.add(subArgs.join(" "));

    case "ls":
    case "list":
      const filter = subArgs[0] as
        | "all"
        | "completed"
        | "pending"
        | undefined;
      if (filter && !["all", "completed", "pending"].includes(filter)) {
        return "Error: Invalid filter. Use: all, completed, or pending";
      }
      return todoManager.list(filter);

    case "done":
    case "complete":
      const completeId = parseInt(subArgs[0]);
      if (isNaN(completeId)) {
        return "Error: Please provide a valid todo ID number";
      }
      return todoManager.complete(completeId);

    case "rm":
    case "remove":
    case "delete":
      const removeId = parseInt(subArgs[0]);
      if (isNaN(removeId)) {
        return "Error: Please provide a valid todo ID number";
      }
      return todoManager.remove(removeId);

    case "clear":
      const onlyCompleted = subArgs[0] === "completed";
      return todoManager.clear(onlyCompleted);

    case "stats":
      return todoManager.stats();

    default:
      return `Unknown todo command: ${subCommand}\n\n${usage}`;
  }
};