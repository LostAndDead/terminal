export const weather = async (args: string[]): Promise<string> => {
  const city = args.join("+");

  if (!city) {
    return "Usage: weather [city]. Example: weather Brussels";
  }

  try {
    const response = await fetch(`https://wttr.in/${city}?ATm`);
    return await response.text();
  } catch (error) {
    return `Weather service unavailable: ${error}`;
  }
};