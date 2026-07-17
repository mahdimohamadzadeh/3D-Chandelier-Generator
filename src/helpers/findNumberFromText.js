export const findNumber = (text) => {
  let num = text.match(/-?\d+(\.\d+)?/g);
  if (num) {
    return Number(num[0]); // Output: number
  } else {
    console.log("No number found");
  }
};
