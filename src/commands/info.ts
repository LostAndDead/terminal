import * as packageJson from "../../package.json";

export const about = (): string => {
  return `
Heya, I'm Lost, the developer behind this silly little thing, I built it as a personal portfolio site and got a bit carried away adding features and customisations.

I'm have a BSc in Applied Cyber Security and am a hobbyist developer. I love tinkering with code, exploring new technologies, and creating fun projects like this one.
I like to mess a lot with Linux, gaming, and music. I'm always open to connecting with fellow tech enthusiasts, so feel free to reach out!
Most of my code on my GitHub is my messy and experimental playground, but I can do better when needed :)

If you want to check out more or contact me check out the 'contact' command!
  `;
};

export const contact = (): string => {
  return `
There are several ways to reach out to me:
- Email: ${packageJson.author.email}
- GitHub: https://github.com/lostanddead
- Twitter: https://twitter.com/lostanddead9001
- Discord: @lostanddead  
  `;
};