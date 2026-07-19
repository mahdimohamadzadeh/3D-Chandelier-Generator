import type { Object3D } from "three";

const SOCKET_IDS = new Set([11815, 11821, 11827, 11836, 12349, 12351, 12352]);

export const SetPositionForNumberOfSocket = (
  copies: Object3D[],
  socketID: number,
  numberOfSocket: number,
  positionX: number,
  positionY: number,
  positionZ: number
): void => {
  if (!SOCKET_IDS.has(socketID)) return;

  switch (numberOfSocket) {
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
      copies[0].position.set(positionX + 0.5, positionY, positionZ);
      copies[1].position.set(-positionX - 0.5, positionY, positionZ);
      copies[1].rotation.set(0, Math.PI, 0);
      copies[2].position.set(0.5, positionY, -12.5);
      copies[2].rotation.set(0, Math.PI / 2, 0);
      copies[3].position.set(-0.5, positionY, 12.5);
      copies[3].rotation.set(0, -Math.PI / 2, 0);
      break;
    case 5:
      copies[0].position.set(-positionX, positionY, -3.5);
      copies[0].rotation.set(0, 2.8, 0);
      copies[1].position.set(0, positionY, -12);
      copies[1].rotation.set(0, Math.PI / 2, 0);
      copies[2].position.set(positionX + 0.5, positionY, -2);
      copies[2].rotation.set(0, 0.2, 0);
      copies[3].position.set(-6, positionY, 10);
      copies[3].rotation.set(0, 4.2, 0);
      copies[4].position.set(8, positionY, 9.5);
      copies[4].rotation.set(0, -0.8, 0);
      break;
    case 6:
      copies[0].position.set(11, positionY, -6);
      copies[0].rotation.set(0, 0.5, 0);
      copies[1].position.set(0.7, positionY, -12.5);
      copies[1].rotation.set(0, Math.PI / 2, 0);
      copies[2].position.set(-10, positionY, -7.5);
      copies[2].rotation.set(0, 2.5, 0);
      copies[3].position.set(-11, positionY, 6);
      copies[3].rotation.set(0, 3.66519, 0);
      copies[4].position.set(-0.4, positionY, 12.5);
      copies[4].rotation.set(0, -Math.PI / 2, 0);
      copies[5].position.set(10.5, positionY, 7);
      copies[5].rotation.set(0, -0.6, 0);
      break;
    case 7:
      copies[0].position.set(0.5, positionY, -12.5);
      copies[0].rotation.set(0, Math.PI / 2, 0);
      copies[1].position.set(-9, positionY, -8.5);
      copies[1].rotation.set(0, 2.4, 0);
      copies[2].position.set(-6, positionY, 10.5);
      copies[2].rotation.set(0, 4.2, 0);
      copies[3].position.set(6, positionY, 11);
      copies[3].rotation.set(0, -1, 0);
      copies[4].position.set(11, positionY, -6.2);
      copies[4].rotation.set(0, 0.5, 0);
      copies[5].position.set(12, positionY, 3.5);
      copies[5].rotation.set(0, -0.28, 0);
      copies[6].position.set(-12, positionY, 3.5);
      copies[6].rotation.set(0, 3.4, 0);
      break;
    case 8:
      copies[0].position.set(positionX + 0.5, positionY, positionZ + 0.5);
      copies[1].position.set(-positionX, positionY, positionZ - 0.5);
      copies[1].rotation.set(0, Math.PI, 0);
      copies[2].position.set(0.5, positionY, -12.5);
      copies[2].rotation.set(0, Math.PI / 2, 0);
      copies[3].position.set(-0.5, positionY, 12.5);
      copies[3].rotation.set(0, -Math.PI / 2, 0);
      copies[4].position.set(10, positionY, -7);
      copies[4].rotation.set(0, 0.6, 0);
      copies[5].position.set(-10, positionY, 7);
      copies[5].rotation.set(0, 3.8, 0);
      copies[6].position.set(-9, positionY, -8.5);
      copies[6].rotation.set(0, 2.4, 0);
      copies[7].position.set(9, positionY, 8.5);
      copies[7].rotation.set(0, -0.7, 0);
      break;
  }
};
