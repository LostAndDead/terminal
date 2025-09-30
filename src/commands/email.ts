import * as packageJson from "../../package.json";

export const email = (): string => {
  window.open(`mailto:${packageJson.author.email}`);
  return `Opening mailto:${packageJson.author.email}...`;
};