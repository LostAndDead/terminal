import * as packageJson from "../../package.json";

export const repo = (): string => {
  window.open(packageJson.repository.url, "_blank");
  return "Opening repository...\nThis project was originally based on https://github.com/m4tt72/terminal";
};