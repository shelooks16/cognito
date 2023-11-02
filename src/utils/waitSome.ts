export const waitSome = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
