export interface Category {
  id: number;
  slug: string;
  title: string;
  description: string;
}

const CATEGORY_ORDER: Record<number, number> = {
  131: 0,
  165: 1,
  168: 2,
  173: 3,
  170: 4,
  166: 5,
  169: 6,
  171: 7,
};

export const GetSortCategory = (categories: Category[]): Category[] => {
  const sortArray: Category[] = [];
  categories.forEach((category) => {
    const position = CATEGORY_ORDER[category.id];
    if (position !== undefined) sortArray[position] = category;
  });
  return sortArray;
};
