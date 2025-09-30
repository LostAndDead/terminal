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
      Information: ["about"],
      System: ["help", "clear", "date", "exit", "echo"],
      Productivity: ["todo", "weather"],
      Customization: ["theme", "banner"],
      Network: ["curl", "hostname", "whoami"],
      Contact: ["email", "contact"],
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
    output += "\nNot all commands are listed, some are hidden for you to discover!";

    return output;
  },
  man: () => `
      ////\\\\\\\\
      |      |
     @  O  O  @
      |  ~   |         \\__
       \\ -- /          |\\ |
     ___|  |___        | \\|
    /          \\      /|__|
   /            \\    / /
  /  /| .  . |\\  \\  / /
 /  / |      | \\  \\/ /
<  <  |      |  \\   /
 \\  \\ |  .   |   \\_/
  \\  \\|______|
    \\_|______|
      |      |
      |  |   |
      |  |   |
      |__|___|
      |  |  |
      (  (  |
      |  |  |
      |  |  |
     _|  |  |
 cccC_Cccc___)
  `,
  beans: () => `🫘`,
  cd: (args: string[]) => {
    if (args.length === 0) {
      return `cd: fast travel not unlocked - explore more areas first`;
    }

    const dir = args[0].toLowerCase().replace(/\/$/, ''); // Remove trailing slash

    // Special directory responses
    switch (dir) {
      case 'aperture_science':
        return `cd: access denied - GLaDOS is not accepting visitors today. "The cake is a lie anyway."`;
      
      case 'black_mesa':
        return `cd: warning - high radiation levels detected. Gordon Freeman is not available for escort.`;
      
      case 'city17':
        return `cd: citizen, you are not authorized to enter City 17. Please report to your nearest Civil Protection officer.`;
      
      case 'cyberpunk2077_bugs':
        return `cd: error - directory too corrupted to enter. Try again in patch 2.1... or maybe 3.0.`;
      
      case 'homework':
        return `cd: access denied - we both know what's really in there. ( ͡° ͜ʖ ͡°)`;
      
      case 'companion_cube':
        return `cd: the Weighted Companion Cube cannot speak, but if it could it would tell you to go away.`;
      
      case 'princess_castle':
        return `cd: sorry Mario, but our princess is in another castle!`;
      
      case 'loot_boxes':
        return `cd: access requires $4.99 DLC purchase. Would you like to buy the "Directory Access Pack"?`;
      
      case '.hidden_stash':
        return `cd: nice try, but this stash is hidden for a reason. Nothing to see here...`;
      
      case 'side_quests':
        return `cd: you have 247 unfinished side quests. Complete main story first!`;
      
      case 'my_social_life.txt':
        return `cd: cannot change directory to file. Also, that file is empty anyway.`;
      
      case 'game_saves':
        return `cd: corrupted save data detected. Your 200-hour playthrough may be lost forever.`;
      
      case 'npc_complaints':
        return `cd: "I used to be an adventurer like you, then I took an arrow to the knee."`;
      
      case 'trash_can':
        return `cd: you found 1 rupee! Wait, this isn't Zelda...`;
      
      case '..':
      case '../':
        return `cd: cannot escape the matrix. You're stuck here forever!`;
      
      case '/':
      case 'root':
        return `cd: nice try, but I'm not giving you root access through a web terminal!`;
      
      case '~':
      case 'home':
        return `cd: home is where the heart is... and your heart is clearly in gaming.`;
      
      default:
        // Random responses for unknown directories
        const randomResponses = [
          `cd: directory '${args[0]}' not found - did you check your minimap?`,
          `cd: access denied - you need a higher level to enter this area`,
          `cd: this is a web terminal, not your actual computer... phew!`,
          `cd: this area is DLC content - purchase required`,
          `cd: directory locked - requires keycard or lockpicking skill 100`,
          `cd: ERROR 404 - directory not found in this simulation`,
          `cd: access denied - have you tried turning it off and on again?`
        ];
        return randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }
  },
  ls: () => `total 1337
drwxr-xr-x  2 player gamers             512 Mar 15 2007 .hidden_stash/
drwxr-xr-x  3 glados science           4096 Oct 10 2007 aperture_science/
drwxr-xr-x  2 gordon freeman           4096 Nov 19 1998 black_mesa/
-rw-r--r--  1 glados science              0 Apr 01 2011 cake_recipe.txt
drwxr-xr-x  4 gordon rebels            4096 Nov 16 2004 city17/
drwxr-xr-x  2 chell  science           1729 Oct 10 2007 companion_cube/
-rw-r--r--  1 gordon freeman           1998 Nov 19 1998 crowbar.exe
drwxr-xr-x  3 nightcity cdpr      204886016 Dec 10 2020 cyberpunk2077_bugs/
drwxr-xr-x  2 steve  crafters          1024 May 17 2009 diamond_pickaxe/
drwxr-xr-x  5 player gamers           32768 Jan 01 1970 game_saves/
-rw-r--r--  1 noob   casuals            420 Feb 29 2016 get_good.txt
-rw-r--r--  1 sniper fps           31415926 Dec 31 1999 headshot.mp4
drwxr-xr-x  8 student totally    2147483648 Aug 15 2023 "homework"/
drwxr-xr-x  2 konami devs              1986 Apr 26 1986 konami_code/
drwxr-xr-x  3 ea     publishers       65536 Nov 15 2017 loot_boxes/
-rw-r--r--  1 alone  forever              0 Sep 11 2001 my_social_life.txt
drwxr-xr-x  2 player world             2048 Aug 24 2011 npc_complaints/
-rw-r--r--  1 parker spidey         1048576 Jun 30 2004 pizza_time.wav
drwxr-xr-x  2 mario  nintendo          8192 Sep 13 1985 princess_castle/
drwxr-xr-x  4 dovah  skyrim          131072 Nov 11 2011 side_quests/
-rw-r--r--  1 runner twitch           16384 Jan 15 2010 speedrun_strats.md
drwxr-xr-x  2 link   hyrule            4096 Nov 21 2000 trash_can/
-rw-r--r--  1 keanu  cdpr              2077 Apr 16 2020 wake_tf_up_samurai.sh`,
  about: () => `
Heya, I'm Lost, the developer behind this silly little thing, I built it as a personal portfolio site and got a bit carried away adding features and customisations.

I'm have a BSc in Applied Cyber Security and am a hobbyist developer. I love tinkering with code, exploring new technologies, and creating fun projects like this one.
I like to mess a lot with Linux, gaming, and music. I'm always open to connecting with fellow tech enthusiasts, so feel free to reach out!
Most of my code on my GitHub is my messy and experimental playground, but I can do better when needed :)

If you want to check out more or contact me check out the 'contact' command!
  `,
  contact: () => `
There are several ways to reach out to me:
- Email: ${packageJson.author.email}
- GitHub: https://github.com/lostanddead
- Twitter: https://twitter.com/lostanddead9001
- Discord: @lostanddead  
  `,
  hostname: () => hostname,
  whoami: async () => {
    // Play the who_are_you sound effect
    try {
      const audio = new Audio('/sounds/turrets/who_are_you.wav');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore audio errors
    } catch (error) {
      // Ignore audio errors silently
    }
    
    return "who are you?";
  },
  date: () => new Date().toLocaleString(),
  vi: () => `why use vi? try 'emacs'`,
  vim: () => `why use vim? try 'emacs'`,
  emacs: () => `why use emacs? try 'vim'`,
  echo: (args: string[]) => args.join(" "),
  rm: (args: string[]) => {
    // Check for the dangerous command
    const fullCommand = args.join(" ");
    
    // Various ways people might try to nuke the system
    const dangerousPatterns = [
      /-rf.*--no-preserve-root.*\//,
      /-rf.*\/.*--no-preserve-root/,
      /--no-preserve-root.*-rf.*\//,
      /--no-preserve-root.*\/.*-rf/,
      /-rf\s+\//,
      /--force.*--recursive.*\//,
      /--recursive.*--force.*\//
    ];

    const isDangerous = dangerousPatterns.some(pattern => pattern.test(fullCommand));

    if (isDangerous || fullCommand.includes("/")) {
      const jokes = [
        `rm: Nice try! But I'm not letting you delete the entire universe from a web browser.`,
        `rm: Error 418 - I'm a teapot, not a system destroyer.`,
        `rm: Cannot delete '/': The matrix has you... but not your filesystem!`,
        `rm: Access denied - Even sudo can't save you from this bad idea!`,
        `rm: *Windows has entered the chat* - "Did someone say delete everything?"`,
        `rm: Plot twist: You're already in a simulation, there's nothing left to delete!`,
        `rm: rm -rf /? More like rm -rf /your_hopes_and_dreams`,
        `rm: Cannot delete root: GLaDOS has already taken control of this facility.`
      ];

      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Regular rm commands
    if (args.length === 0) {
      return `rm: missing operand`;
    }

    // Check if they're trying to delete files from our fake filesystem
    const target = args[args.length - 1];
    
    if (target === "my_social_life.txt") {
      return `rm: cannot remove '${target}': File doesn't exist (it never did) 💀`;
    } else if (target === "cake_recipe.txt") {
      return `rm: cannot remove '${target}': The cake is a lie anyway! 🍰`;
    } else if (target.includes("homework")) {
      return `rm: cannot remove '${target}': Nice try, but we're keeping the evidence 📁`;
    } else if (target.includes("cyberpunk")) {
      return `rm: cannot remove '${target}': Bugs are a feature, not something to delete! 🐛`;
    } else {
      return `rm: cannot remove '${target}': This is a web terminal, not your actual filesystem! 🌐`;
    }
  },
  sudo: (args: string[]) => {
    // Play the rick_roll sound effect
    try {
      const audio = new Audio('/sounds/turrets/rick_roll.wav');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore audio errors
    } catch (error) {
      // Ignore audio errors silently
    }

    return `Permission denied: unable to run the command '${args[0]}' as root. Enjoy the music!`;
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

    return "Opening repository...\nThis project was originally based on https://github.com/m4tt72/terminal";
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

Type 'help' to see list of available commands. (Some commands are hidden for you to discover!)
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
