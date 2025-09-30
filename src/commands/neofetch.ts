export const neofetch = (): string => {
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
`;
};