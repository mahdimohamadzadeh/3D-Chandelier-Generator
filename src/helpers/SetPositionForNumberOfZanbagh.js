export const SetPositionForNumberOfZanbagh = (
  copies,
  zanbaghID,
  numberOfZanbagh,
  positionX,
  positionY,
  positionZ
) => {
  switch (zanbaghID) {
    case 11827:
    case 11821:
    case 11815:
      switch (numberOfZanbagh) {
        case 2:
          copies[0].position.set(positionX, positionY, positionZ);
          copies[1].position.set(-positionX, positionY, positionZ);
          copies[1].rotation.set(0, Math.PI / 1, 0);
          break;
        case 3:
          copies[0].position.set(positionX, positionY, positionZ);
          copies[1].position.set(-positionX, positionY, positionZ);
          copies[1].rotation.set(0, Math.PI / 1, 0);
          copies[2].position.set(0, positionY, -9);
          copies[2].rotation.set(0, Math.PI / 2, 0);
          break;
        case 4:
          copies[0].position.set(positionX + 0.5, positionY, positionZ); // right position
          copies[1].position.set(-positionX - 0.5, positionY, positionZ); // left position
          copies[1].rotation.set(0, Math.PI / 1, 0);
          copies[2].position.set(0.5, positionY, -12.5); // back position
          copies[2].rotation.set(0, Math.PI / 2, 0);
          copies[3].position.set(-0.5, positionY, 12.5); // front position
          copies[3].rotation.set(0, -(Math.PI / 2), 0);
          break;
        case 5:
          copies[0].position.set(-positionX, positionY, -3.5); // left-back position
          copies[0].rotation.set(0, 2.8, 0);
          copies[1].position.set(0, positionY, -12); // back position
          copies[1].rotation.set(0, Math.PI / 2, 0);
          copies[2].position.set(positionX + 0.5, positionY, -2); // right-back position
          copies[2].rotation.set(0, 0.2, 0);
          copies[3].position.set(-6, positionY, 10); // left-front position
          copies[3].rotation.set(0, 4.2, 0);
          copies[4].position.set(8, positionY, 9.5); // right-front position
          copies[4].rotation.set(0, -0.8, 0);
          break;
        case 6:
          copies[0].position.set(11, positionY, -6); // North est position
          copies[0].rotation.set(0, 0.5, 0);
          copies[1].position.set(0.7, positionY, -12.5); // North  position
          copies[1].rotation.set(0, Math.PI / 2, 0);
          copies[2].position.set(-10, positionY, -7.5); // North west position
          copies[2].rotation.set(0, 2.5, 0);
          copies[3].position.set(-11, positionY, 6); // South west position
          copies[3].rotation.set(0, 3.66519, 0);
          copies[4].position.set(-0.4, positionY, 12.5); // South position
          copies[4].rotation.set(0, -(Math.PI / 2), 0);
          copies[5].position.set(10.5, positionY, 7); // South est position
          copies[5].rotation.set(0, -0.6, 0);
          break;
        case 7:
          copies[0].position.set(0.5, positionY, -12.5); // North position  x + 2 // z + 2.5
          copies[0].rotation.set(0, Math.PI / 2, 0);
          copies[1].position.set(-9, positionY, -8.5); // North west position
          copies[1].rotation.set(0, 2.4, 0);
          copies[2].position.set(-6, positionY, 10.5); // South west position
          copies[2].rotation.set(0, 4.2, 0);
          copies[3].position.set(6, positionY, 11); // South est position
          copies[3].rotation.set(0, -1, 0);
          copies[4].position.set(11, positionY, -6.2); // North est position
          copies[4].rotation.set(0, 0.5, 0);
          copies[5].position.set(12, positionY, 3.5); // Between north est and south est position
          copies[5].rotation.set(0, -0.28, 0);
          copies[6].position.set(-12, positionY, 3.5); // Between north west and south west position
          copies[6].rotation.set(0, 3.4, 0);
          break;
        case 8:
          copies[0].position.set(positionX + 0.5, positionY, positionZ + 0.5); // Est position
          copies[1].position.set(-positionX, positionY, positionZ - 0.5); // West position
          copies[1].rotation.set(0, Math.PI / 1, 0);
          copies[2].position.set(0.5, positionY, -12.5); // North position
          copies[2].rotation.set(0, Math.PI / 2, 0);
          copies[3].position.set(-0.5, positionY, 12.5); // South position
          copies[3].rotation.set(0, -(Math.PI / 2), 0);
          copies[4].position.set(10, positionY, -7); // North est position
          copies[4].rotation.set(0, 0.6, 0);
          copies[5].position.set(-10, positionY, 7); // South west position
          copies[5].rotation.set(0, 3.8, 0);
          copies[6].position.set(-9, positionY, -8.5); // North west position
          copies[6].rotation.set(0, 2.4, 0);
          copies[7].position.set(9, positionY, 8.5); // South est position
          copies[7].rotation.set(0, -0.7, 0);
          break;
      }
      break;
    case 11796:
      console.log(
        shakhehID,
        copies,
        numberOfShakheh,
        positionX,
        positionY,
        positionZ
      );
      break;
  }
};
