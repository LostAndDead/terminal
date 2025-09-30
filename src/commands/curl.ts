export const curl = async (args: string[]): Promise<string> => {
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
};