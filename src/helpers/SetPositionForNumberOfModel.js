import { SetPositionForNumberOfLaleh } from "./SetPositionForNumberOfLaleh";
import { SetPositionForNumberOfShakheh } from "./SetPositionForNumberOfShakheh";
import { SetPositionForNumberOfZanbagh } from "./SetPositionForNumberOfZanbagh";

export const setPositionForNumberOfModel = (
  copies,
  categoryID,
  modelID,
  numberOfModel,
  positionX,
  positionY,
  positionZ
) => {
  switch (categoryID) {
    case 131:
      return 0;
      break;
    case 165:
      return 1;
      break;
    case 168:
      SetPositionForNumberOfShakheh(
        copies,
        modelID,
        numberOfModel,
        positionX,
        positionY,
        positionZ
      );
      break;
    case 173:
      return 3;
      break;
    case 170:
      SetPositionForNumberOfZanbagh(
        copies,
        modelID,
        numberOfModel,
        positionX,
        positionY,
        positionZ
      );
      break;
    // 167: 5,
    case 166:
      SetPositionForNumberOfLaleh(
        copies,
        modelID,
        numberOfModel,
        positionX,
        positionY,
        positionZ
      );
      break;
    case 169:
      return 6;
      break;
    case 171:
      return 7;
      break;
  }
};
