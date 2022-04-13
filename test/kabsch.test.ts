import { getRigidTransformation } from "../src/index";
import {
  add as matrixAdd,
  multiply as matrixMultiply,
} from 'mathjs';

describe("rigid transformation", function () {
  const numberOfPoints = 10;


  function getRandom() {
    const max = 10000;
    return Math.floor(Math.random() * max);
  }

  function getRandomPoint() {
    return [getRandom(), getRandom(), getRandom()];
  }

  function generatePoints(n: number) {
    const points = [];
    for (let i = 0; i < n; i++) {
      points.push(getRandomPoint());
    }

    return points;
  }

  function generateTestTable(pointSet1: number[][], pointSet2: number[][]) {
    const testTable = [];
    for (let i = 0; i < numberOfPoints; i++) {
      const point1 = pointSet1[i];
      const point2 = pointSet2[i];
      const transformed = matrixAdd(matrixMultiply(rotation, point1), translation).valueOf() as number[];

      const tableRow = { output: transformed, expected: point2 };
      testTable.push(tableRow);
    }

    return testTable;
  }

  const pointSet1 = generatePoints(numberOfPoints);
  const pointSet2 = [...pointSet1];
  const [rotation, translation] = getRigidTransformation(pointSet1, pointSet2);


  const testTable = generateTestTable(pointSet1, pointSet2);
  test.each(testTable)("rigid transformation test", function ({ output, expected }) {
    expect(output).toEqual(expected);
  });
});