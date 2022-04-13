import { getRigidTransformation } from "../src/index";
import {
  add as matrixAdd,
  multiply as matrixMultiply,
} from 'mathjs';

describe("rigid transformation", function () {

  function getRandom() {
    const max = 10000;
    return Math.floor(Math.random() * max);
  }

  function getRandomPoint() {
    return [getRandom(), getRandom(), getRandom()];
  }

  test("identity", function () {
    const point1 = getRandomPoint();
    const point2 = getRandomPoint();
    const point3 = [...point1];
    const point4 = [...point2];
    const [r, t] = getRigidTransformation([point1, point2], [point3, point4]);
    const transformed = matrixAdd(matrixMultiply(r, point1), t).valueOf() as number[];

    expect(transformed.map(num => Math.round(num))).toEqual(point1);
  });
});