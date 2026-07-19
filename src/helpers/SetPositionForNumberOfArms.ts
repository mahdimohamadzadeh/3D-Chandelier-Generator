import type { Object3D } from "three";

const ARMS_IDS = new Set([11798, 11799, 11800, 11801, 11803]);

export const SetPositionForNumberOfArms = (
  copies: Object3D[],
  armsID: number,
  numberOfArms: number,
  positionX: number,
  positionY: number,
  positionZ: number
): void => {
  if (!ARMS_IDS.has(armsID)) return;

  switch (numberOfArms) {
    case 2:
      copies[0].position.set(positionX, positionY, positionZ);
      copies[1].position.set(-positionX, positionY, positionZ);
      copies[1].rotation.set(0, Math.PI, 0);
      break;
    case 3:
      copies[0].position.set(positionX, positionY, positionZ);
      copies[1].position.set(-positionX, positionY, positionZ);
      copies[1].rotation.set(0, Math.PI, 0);
      copies[2].position.set(0, positionY, -9);
      copies[2].rotation.set(0, Math.PI / 2, 0);
      break;
    case 4:
      copies[0].position.set(positionX, positionY, positionZ);
      copies[1].position.set(-positionX, positionY, positionZ);
      copies[1].rotation.set(0, Math.PI, 0);
      copies[2].position.set(0, positionY, -9);
      copies[2].rotation.set(0, Math.PI / 2, 0);
      copies[3].position.set(0, positionY, 9);
      copies[3].rotation.set(0, -Math.PI / 2, 0);
      break;
    case 5:
      copies[0].position.set(-positionX, positionY, -2);
      copies[0].rotation.set(0, 2.8, 0);
      copies[1].position.set(0, positionY, -9);
      copies[1].rotation.set(0, Math.PI / 2, 0);
      copies[2].position.set(positionX, positionY, -2);
      copies[2].rotation.set(0, 0.2, 0);
      copies[3].position.set(-4, positionY, 8);
      copies[3].rotation.set(0, 4.2, 0);
      copies[4].position.set(6, positionY, 7);
      copies[4].rotation.set(0, -0.8, 0);
      break;
    case 6:
      copies[0].position.set(8, positionY, -5);
      copies[0].rotation.set(0, 0.5, 0);
      copies[1].position.set(0, positionY, -9);
      copies[1].rotation.set(0, Math.PI / 2, 0);
      copies[2].position.set(-8, positionY, -5.5);
      copies[2].rotation.set(0, 2.5, 0);
      copies[3].position.set(-8, positionY, 5);
      copies[3].rotation.set(0, 3.66519, 0);
      copies[4].position.set(0, positionY, 9);
      copies[4].rotation.set(0, -Math.PI / 2, 0);
      copies[5].position.set(8, positionY, 5);
      copies[5].rotation.set(0, -0.6, 0);
      break;
    case 7:
      copies[0].position.set(0, positionY, -9);
      copies[0].rotation.set(0, Math.PI / 2, 0);
      copies[1].position.set(-7, positionY, -6);
      copies[1].rotation.set(0, 2.4, 0);
      copies[2].position.set(-4, positionY, 8);
      copies[2].rotation.set(0, 4.2, 0);
      copies[3].position.set(4.5, positionY, 8);
      copies[3].rotation.set(0, -1, 0);
      copies[4].position.set(8, positionY, -5);
      copies[4].rotation.set(0, 0.5, 0);
      copies[5].position.set(9, positionY, 2.5);
      copies[5].rotation.set(0, -0.28, 0);
      copies[6].position.set(-9, positionY, 3);
      copies[6].rotation.set(0, 3.4, 0);
      break;
    case 8:
      copies[0].position.set(positionX, positionY, positionZ);
      copies[1].position.set(-positionX, positionY, positionZ);
      copies[1].rotation.set(0, Math.PI, 0);
      copies[2].position.set(0, positionY, -9);
      copies[2].rotation.set(0, Math.PI / 2, 0);
      copies[3].position.set(0, positionY, 9);
      copies[3].rotation.set(0, -Math.PI / 2, 0);
      copies[4].position.set(7, positionY, -5.5);
      copies[4].rotation.set(0, 0.6, 0);
      copies[5].position.set(-7, positionY, 5.5);
      copies[5].rotation.set(0, 3.8, 0);
      copies[6].position.set(-7, positionY, -6);
      copies[6].rotation.set(0, 2.4, 0);
      copies[7].position.set(7, positionY, 6);
      copies[7].rotation.set(0, -0.7, 0);
      break;
  }
};
