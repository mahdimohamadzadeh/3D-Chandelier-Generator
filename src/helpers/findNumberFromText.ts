export const findNumber = (text: string): number => {
  const num = text.match(/-?\d+(\.\d+)?/g);
  if (num) return Number(num[0]);
  console.log("No number found");
  return 0;
};
