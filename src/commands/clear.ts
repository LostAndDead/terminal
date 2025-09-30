import { history } from "../stores/history";

export const clear = (): string => {
  history.set([]);

  // Automatically run banner after clear
  // Note: This creates a circular dependency issue, so we'll handle this differently
  // For now, just clear the history
  return "";
};