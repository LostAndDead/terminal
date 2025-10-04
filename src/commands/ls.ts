import { colourText, type ColouredOutput } from '../utils/colours';

export const ls = (): ColouredOutput => {
  const items = [
    'total 1337',
    'drwxr-xr-x  2 player gamers             512 Mar 15 2007 .hidden_stash/',
    'drwxr-xr-x  3 glados science           4096 Oct 10 2007 aperture_science/',
    'drwxr-xr-x  2 gordon freeman           4096 Nov 19 1998 black_mesa/',
    '-rw-r--r--  1 glados science              0 Apr 01 2011 cake_recipe.txt',
    'drwxr-xr-x  4 gordon rebels            4096 Nov 16 2004 city17/',
    'drwxr-xr-x  2 chell  science           1729 Oct 10 2007 companion_cube/',
    '-rw-r--r--  1 gordon freeman           1998 Nov 19 1998 crowbar.exe',
    'drwxr-xr-x  3 nightcity cdpr      204886016 Dec 10 2020 cyberpunk2077_bugs/',
    'drwxr-xr-x  2 steve  crafters          1024 May 17 2009 diamond_pickaxe/',
    'drwxr-xr-x  5 player gamers           32768 Jan 01 1970 game_saves/',
    '-rw-r--r--  1 noob   casuals            420 Feb 29 2016 get_good.txt',
    '-rw-r--r--  1 sniper fps           31415926 Dec 31 1999 headshot.mp4',
    'drwxr-xr-x  8 student totally    2147483648 Aug 15 2023 "homework"/',
    'drwxr-xr-x  2 konami devs              1986 Apr 26 1986 konami_code/',
    'drwxr-xr-x  3 ea     publishers       65536 Nov 15 2017 loot_boxes/',
    '-rw-r--r--  1 alone  forever              0 Sep 11 2001 my_social_life.txt',
    'drwxr-xr-x  2 player world             2048 Aug 24 2011 npc_complaints/',
    '-rw-r--r--  1 parker spidey         1048576 Jun 30 2004 pizza_time.wav',
    'drwxr-xr-x  2 mario  nintendo          8192 Sep 13 1985 princess_castle/',
    'drwxr-xr-x  4 dovah  skyrim          131072 Nov 11 2011 side_quests/',
    '-rw-r--r--  1 runner twitch           16384 Jan 15 2010 speedrun_strats.md',
    'drwxr-xr-x  2 link   hyrule            4096 Nov 21 2000 trash_can/',
    '-rw-r--r--  1 keanu  cdpr              2077 Apr 16 2020 wake_tf_up_samurai.sh'
  ];

  const result: ColouredOutput = [];

  items.forEach((item, index) => {
    if (index === 0) {
      // Total line stays default
      result.push(item + '\n');
      return;
    }

    const isDirectory = item.startsWith('d');
    const isHidden = item.includes('/.');
    const isExecutable = item.endsWith('.exe') || item.endsWith('.sh');
    
    // Extract filename (last part after the date)
    const parts = item.split(/\s+/);
    const filename = parts[parts.length - 1];
    const beforeFilename = item.substring(0, item.lastIndexOf(filename));
    
    result.push(beforeFilename);
    
    if (isHidden) {
      result.push(colourText(filename, '#808080')); // Dim gray for hidden files
    } else if (isDirectory) {
      result.push(colourText(filename, '#00bfff')); // Blue for directories
    } else if (isExecutable) {
      result.push(colourText(filename, '#00ff00')); // Green for executables
    } else {
      result.push(filename); // Regular files stay default color
    }
    
    result.push('\n');
  });

  return result;
};