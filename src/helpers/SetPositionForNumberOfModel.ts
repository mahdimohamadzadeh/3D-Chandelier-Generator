import type { Object3D } from "three";
import { SetPositionForNumberOfArms } from "./SetPositionForNumberOfArms";
import { SetPositionForNumberOfSocket } from "./SetPositionForNumberOfSocket";
import { SetPositionForNumberOfBulb } from "./SetPositionForNumberOfBulb";

export const setPositionForNumberOfModel = (
  copies: Object3D[],
  categoryID: number,
  modelID: number,
  numberOfModel: number,
  positionX: number,
  positionY: number,
  positionZ: number
): void => {
  switch (categoryID) {
    case 168:
      SetPositionForNumberOfArms(copies, modelID, numberOfModel, positionX, positionY, positionZ);
      break;
    case 169:
    case 170:
      SetPositionForNumberOfSocket(copies, modelID, numberOfModel, positionX, positionY, positionZ);
      break;
    case 166:
      SetPositionForNumberOfBulb(copies, modelID, numberOfModel, positionX, positionY, positionZ);
      break;
  }
};
