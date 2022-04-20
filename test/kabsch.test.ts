import { getRigidTransformation } from '../src/index';
import { SVD } from 'svd-js';
import { add as matrixAdd } from 'mathjs';
import { matrixMultiply } from '../src/linear_algebra_gl';

import rewire from 'rewire';
const checkOrientation = rewire('../dist/geometry_helper.js').__get__(
  'checkOrientation'
);

describe('rigid transformation', function () {
  const numberOfPoints = 10;

  function getTransformedPoint(
    point: number[],
    rotationMatrix: number[][],
    translationVec: number[]
  ) {
    const rotatedPoint = matrixMultiply(rotationMatrix, point.map(el=>[el])).flat();
    return matrixAdd(
      rotatedPoint,
      translationVec
    ).valueOf() as number[];
  }

  function getRandom() {
    const max = 10000;
    return Math.floor(Math.random() * max);
  }

  function getRandomPoint() {
    return [getRandom(), getRandom(), getRandom()];
  }

  function generatePoints(n: number): number[][] {
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
      const rotatedPoint = matrixMultiply(rotation as number[][], point1.map(el=>[el])).flat()
      const transformed = matrixAdd(
        rotatedPoint,
        translation
      ).valueOf() as number[];

      const tableRow = { output: transformed, expected: point2 };
      testTable.push(tableRow);
    }

    return testTable;
  }

  const pointSet1 = generatePoints(numberOfPoints);
  const pointSet2 = [...pointSet1];
  const [rotation, translation] = getRigidTransformation(pointSet1, pointSet2);

  const testTable = generateTestTable(pointSet1, pointSet2);
  console.log(testTable); // eslint-disable-line
  test.each(testTable)(
    'rigid transformation between point sets',
    function ({ output, expected }) {
      expect(output).toEqual(expected);
    }
  );

  test('random transformation matrix', function () {
    function getTransformedPoints(
      pointSet: number[][],
      rotationMatrix: number[][],
      translationVec: number[]
    ) {
      return pointSet.map((point) =>
        getTransformedPoint(point, rotationMatrix, translationVec)
      );
    }

    let rotationalMat = generatePoints(3);
    const translationVec = getRandomPoint();

    // making sure rotational matrix is orthogonal
    const { u, v } = SVD(rotationalMat, true, true, Number.MIN_VALUE);
    rotationalMat = matrixMultiply(u, v);
    rotationalMat = checkOrientation(rotationalMat);

    const pointSet3 = getTransformedPoints(
      pointSet1,
      rotationalMat,
      translationVec
    );
    const [R, T] = getRigidTransformation(pointSet1, pointSet3);

    const rotationMatFlat = rotationalMat.flat().map((el) => Math.round(el));
    const computedRotationMatFlat = R.flat().map((el) => Math.round(el));

    expect(computedRotationMatFlat).toEqual(rotationMatFlat);
    expect(T.flat().map((el) => Math.round(el))).toEqual(
      translationVec.map((el) => Math.round(el))
    );
  });
});
