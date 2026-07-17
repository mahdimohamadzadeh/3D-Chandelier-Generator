export const SetNumberOfProduct = (numberOfProduct, categoryID) => {
  let resultNumber = null;
  if (categoryID === 168 || categoryID === 170 || categoryID === 166) {
    resultNumber = numberOfProduct;
  } else {
    resultNumber = 1;
  }

  return resultNumber;
};
