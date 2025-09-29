import * as packageJson from "../../package.json";
import themesData from "../../themes.json";
import { history } from "../stores/history";
import { theme } from "../stores/theme";
import { todoManager } from "./todo";
import { loadSounds, getRandomSound, getSoundNames } from "./sounds";

const themes = themesData;

const hostname = window.location.hostname;

export const commands: Record<string, (args: string[]) => Promise<string> | string> = {
  help: () => {
    const categories = {
      System: ["help", "clear", "date", "exit"],
      Productivity: ["todo", "weather"],
      Customization: ["theme", "banner"],
      Network: ["curl", "hostname", "whoami"],
      Contact: ["email", "repo", "donate"],
      Fun: ["play", "neofetch"],
    };

    let output = "Available commands:\n\n";

    for (const [category, cmds] of Object.entries(categories)) {
      output += `${category}:\n`;
      output += cmds.map((cmd) => `  ${cmd}`).join("\n");
      output += "\n\n";
    }

    output +=
      'Type "[command] help" or "[command]" without args for more info.';

    return output;
  },
  hostname: () => hostname,
  whoami: () => "idk, you tell me",
  date: () => new Date().toLocaleString(),
  vi: () => `why use vi? try 'emacs'`,
  vim: () => `why use vim? try 'emacs'`,
  emacs: () => `why use emacs? try 'vim'`,
  echo: (args: string[]) => args.join(" "),
  sudo: (args: string[]) => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");

    return `Permission denied: unable to run the command '${args[0]}' as root.`;
  },
  theme: (args: string[]) => {
    const usage = `Usage: theme [args].
    [args]:
      ls: list all available themes
      set: set theme to [theme]

    [Examples]:
      theme ls
      theme set gruvboxdark
    `;
    if (args.length === 0) {
      return usage;
    }

    switch (args[0]) {
      case "ls": {
        const themeNames = themes.map((t) => t.name.toLowerCase());
        
        // Format themes in columns with smart wrapping
        const maxLineLength = 80;
        const lines: string[] = [];
        let currentLine = '';
        
        for (const themeName of themeNames) {
          const addition = currentLine ? `, ${themeName}` : themeName;
          
          if (currentLine.length + addition.length > maxLineLength) {
            // Start a new line
            lines.push(currentLine);
            currentLine = themeName;
          } else {
            currentLine += addition;
          }
        }
        
        // Add the last line if it has content
        if (currentLine) {
          lines.push(currentLine);
        }
        
        let result = `Available themes (${themes.length} total):\n\n`;
        result += lines.join('\n');
        //result += `\n\nYou can preview all these themes here: ${packageJson.repository.url}/tree/master/docs/themes`;
        
        return result;
      }

      case "set": {
        if (args.length !== 2) {
          return usage;
        }

        const selectedTheme = args[1].toLowerCase();
        const t = themes.find((t) => t.name.toLowerCase() === selectedTheme);

        if (!t) {
          return `Theme '${selectedTheme}' not found. Try 'theme ls' to see all available themes.
Available themes starting with '${selectedTheme.charAt(0)}': ${themes.filter(theme => theme.name.toLowerCase().startsWith(selectedTheme.charAt(0))).map(theme => theme.name.toLowerCase()).join(', ')}`;
        }

        theme.set(t);

        return `Theme set to ${selectedTheme}`;
      }

      default: {
        return usage;
      }
    }
  },
  repo: () => {
    window.open(packageJson.repository.url, "_blank");

    return "Opening repository...";
  },
  clear: () => {
    history.set([]);

    // Automatically run banner after clear
    const bannerCommand = commands['banner'] as () => string;
    const bannerOutput = bannerCommand();
    history.set([{ command: 'banner', outputs: [bannerOutput] }]);

    return "";
  },
  email: () => {
    window.open(`mailto:${packageJson.author.email}`);

    return `Opening mailto:${packageJson.author.email}...`;
  },
  weather: async (args: string[]) => {
    const city = args.join("+");

    if (!city) {
      return "Usage: weather [city]. Example: weather Brussels";
    }

    const weather = await fetch(`https://wttr.in/${city}?ATm`);

    return weather.text();
  },
  exit: () => {
    return "Please close the tab to exit.";
  },
  curl: async (args: string[]) => {
    if (args.length === 0) {
      return "curl: no URL provided";
    }

    const url = args[0];

    try {
      const response = await fetch(url);
      const data = await response.text();

      return data;
    } catch (error) {
      return `curl: could not fetch URL ${url}. Details: ${error}`;
    }
  },
  banner: () => `
 █████                         █████       ██████████                          █████
░░███                         ░░███       ░░███░░░░███                        ░░███ 
 ░███         ██████   █████  ███████      ░███   ░░███  ██████   ██████    ███████ 
 ░███        ███░░███ ███░░  ░░░███░       ░███    ░███ ███░░███ ░░░░░███  ███░░███ 
 ░███       ░███ ░███░░█████   ░███        ░███    ░███░███████   ███████ ░███ ░███ 
 ░███      █░███ ░███ ░░░░███  ░███ ███    ░███    ███ ░███░░░   ███░░███ ░███ ░███ 
 ███████████░░██████  ██████   ░░█████  ██ ██████████  ░░██████ ░░████████░░████████
░░░░░░░░░░░  ░░░░░░  ░░░░░░     ░░░░░  ░░ ░░░░░░░░░░    ░░░░░░   ░░░░░░░░  ░░░░░░░░  v${packageJson.version}

Type 'help' to see list of available commands.
`,
  todo: (args: string[]) => {
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
  },
  play: async (args: string[]) => {
    // Load sounds dynamically
    const soundNames = getSoundNames();
    
    const usage = `Usage: play [sound]

Available sounds:
${soundNames.length > 0 ? soundNames.map(name => `  ${name}`).join('\n') : '  No sounds found'}

Examples:
  play ${soundNames[0] || 'example'}
`;

    if (args.length === 0) {
      return usage;
    }

    const soundName = args[0].toLowerCase();
    const soundFile = getRandomSound(soundName);

    if (!soundFile) {
      return `Sound '${soundName}' not found. Try 'play' without arguments to see available sounds.`;
    }

    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.3; // Set volume to 30% to avoid being too loud
      
      // Try to play the audio file
      await audio.play();
      return `♪ Playing ${soundName}... (${soundFile})`;
      
    } catch (error) {
      return `Error: Could not play '${soundName}'. Make sure ${soundFile} exists and is accessible.`;
    }
  },
  neofetch: () => {
    const platform = (navigator.userAgent)?.toLowerCase();
    var platformName = "Unknown OS";
    if (platform.includes("win")) platformName = "Windows";
    if (platform.includes("mac")) platformName = "macOS";
    if (platform.includes("linux")) platformName = "Linux";
    return `
           +*####*#####**#++#**             
       ####+*############*+#%###**          
      %#####*+++++++++++*#%%#####%%#        
     %####***##############**###%%%#        nerd@lost.dead
     **##########################*#%        -------------------------
   *###################%%##########%%%      OS: ${platformName}
   #%%*+=+##***************+++++*#@@@       Host: KVM Server RS 2000 G11
    %%+===-------------==+++++++*%@@        Kernel: 6.8.0-83-generic
    %#==---------------==+++++++*%%@        Uptime: 7 days, 13 hour, 37 mins
    %#==---------------==++++++*#%%@        Packages: 21 (npm)
    %#+----------------===++++###%@@        Shell: lost.dead-web
    %##*---------------====+###%%@@@        Resolution: 1280x800
    %@%##*==----------=######%@@%@@@        Terminal: run-parts
     %%%%*****+++*+++**%%%%%%%%%%@          CPU: PotatOS (2) @ 2.586GHz
       =*#*###***##**#*#@@@                 Memory: 2095MiB / 15990MiB
     ###*@@@%%#@@@@@@@#%@@@%%%#####%%   
    %%%%*%@@@@@*=##%###%@@@%%##%%%%%%%  
  %%%#=-#*%@@@%*::-++**@@+--#%%%%%%%%%%%
 %%%*:-==**@@@%#-::::=*%===#++##%%%%%%%%
%++#::-==+*%@@##=:::::*==+%==+====%%%%%%
`
  }
};
