export const rm = (args: string[]): string => {
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
    // Play a warning sound if available
    try {
      const audio = new Audio('/sounds/turrets/target-1.wav');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore audio errors
    } catch (error) {
      // Ignore audio errors silently
    }

    const jokes = [
      `rm: Nice try! But I'm not letting you delete the entire universe from a web browser. 🌌`,
      `rm: Error 418 - I'm a teapot, not a system destroyer. ☕`,
      `rm: Cannot delete '/': The matrix has you... but not your filesystem! 😎`,
      `rm: Access denied - Even sudo can't save you from this bad idea! 💀`,
      `rm: *Windows has entered the chat* - "Did someone say delete everything?" 🪟`,
      `rm: Plot twist: You're already in a simulation, there's nothing left to delete! 🎮`,
      `rm: rm -rf /? More like rm -rf /your_hopes_and_dreams 💔`,
      `rm: Cannot delete root: GLaDOS has already taken control of this facility. 🤖`
    ];

    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // Regular rm commands
  if (args.length === 0) {
    return `rm: missing operand\nTry 'rm --help' for more information.`;
  }

  // Check if they're trying to delete files from our fake filesystem
  const target = args[args.length - 1];
  
  if (target === "my_social_life.txt") {
    return `rm: cannot remove '${target}': File doesn't exist (it never did)`;
  } else if (target === "cake_recipe.txt") {
    return `rm: cannot remove '${target}': The cake is a lie anyway!`;
  } else if (target.includes("homework")) {
    return `rm: cannot remove '${target}': Nice try, but we're keeping the evidence`;
  } else if (target.includes("cyberpunk")) {
    return `rm: cannot remove '${target}': Bugs are a feature, not something to delete!`;
  } else {
    return `rm: cannot remove '${target}': This is a web terminal, not your actual filesystem!`;
  }
};