export const concatLog = (...value: string[]) => {
  return "> " + value.join("\n> ");
};
