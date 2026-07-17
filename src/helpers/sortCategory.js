export const GetSortCategory = (categories) => {
  const sortArray = [];

  const positions = {
    131: 0, // Category with ID 131 goes to position 0
    165: 1,
    168: 2,
    173: 3,
    170: 4,
    // 167: 5,
    166: 5,
    169: 6,
    171: 7,
  };

  // Place categories in the sort array based on specified positions
  categories.forEach((category) => {
    const position = positions[category.id];
    if (position !== undefined) {
      sortArray[position] = category;
    }
  });

  return sortArray;
};
