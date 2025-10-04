export const help = (): string => {
  const categories = {
    Information: ["about"],
    System: ["help", "clear", "date", "exit", "echo"],
    Productivity: ["todo", "weather"],
    Customization: ["theme", "banner", "colour"],
    Network: ["curl", "hostname", "whoami"],
    Contact: ["email", "contact"],
    Fun: ["play", "neofetch", "colourdemo"],
  };

  let output = "Available commands:\n\n";

  for (const [category, cmds] of Object.entries(categories)) {
    output += `${category}:\n`;
    output += cmds.map((cmd) => `  ${cmd}`).join("\n");
    output += "\n\n";
  }

  output +=
    'Type "[command] help" or "[command]" without args for more info.';
  output += "\nNot all commands are listed, some are hidden for you to discover!";

  return output;
};