const MULTI_COPY_CATEGORIES = new Set([168, 170, 166, 169]);

export const SetNumberOfProduct = (
  numberOfProduct: number,
  categoryID: number
): number => (MULTI_COPY_CATEGORIES.has(categoryID) ? numberOfProduct : 1);
