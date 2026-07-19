export const getCategoryIndex = (categoryID: number): number => {
  const map: Record<number, number> = {
    131: 0,
    165: 1,
    168: 2,
    173: 3,
    170: 4,
    166: 5,
    169: 6,
    171: 7,
  };
  return map[categoryID] ?? -1;
};
