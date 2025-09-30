export const cd = (args: string[]): string => {
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
        `cd: loading screen stuck at 99%... please wait`,
        `cd: this area is DLC content - purchase required`,
        `cd: directory locked - requires keycard or lockpicking skill 100`,
        `cd: cannot access directory - fast travel point not discovered yet`
      ];
      return randomResponses[Math.floor(Math.random() * randomResponses.length)];
  }
};