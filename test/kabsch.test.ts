import { getRigidTransformation } from "../src/index";
import {
  add as matrixAdd,
  multiply as matrixMultiply,
} from 'mathjs';

describe("kabsch", function () {
  test("identity", function () {
    const point1 = [1, 2, 3];
    const point2 = [4, 5, 6];


    const point3 = [1, 2, 3];
    const point4 = [4, 5, 6];

    const [r, t] = getRigidTransformation([point1, point2], [point3, point4]);
    const transformed = matrixAdd(matrixMultiply(r, point1), t).valueOf() as number[];

    expect(transformed.map(num => Math.round(num))).toEqual([1, 2, 3]);
  });
});