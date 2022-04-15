import {
  apply as matrixApply,
  sum as matrixSum,
  divide as matrixDivide,
  size,
  index,
  subset,
  det,
  dotMultiply
} from 'mathjs';

export function getCentroid(points: number[][]) {
  const pointsSize = size(points).valueOf() as Array<number>;
  const numPoints = pointsSize[0];
  const pointsSum = matrixApply(points, 0, matrixSum);
  const centroid = matrixDivide(
    pointsSum,
    numPoints
  ).valueOf() as Array<number>;
  return centroid;
}

export function checkReflection(rotationalMatrix: number[][]) {
  const determinant = det(rotationalMatrix);
  if (determinant < 0) {
    const thirdColumn = subset(rotationalMatrix, index([0, 1, 2], 2));
    rotationalMatrix = subset(
      rotationalMatrix,
      index([0, 1, 2], 2),
      dotMultiply(thirdColumn, -1)
    );
  }

  return rotationalMatrix;
}
