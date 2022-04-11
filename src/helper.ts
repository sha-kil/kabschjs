import {
  apply as matrixApply,
  index as matrixIndex,
  Matrix,
  subset as matrixSubset,
  sum as matrixSum,
  divide as matrixDivide,
  matrix as createMatrix,
  size,
  MathArray
} from 'mathjs';


export function getCentroid(points: number[][]) {
  const pointsSize = size(points).valueOf() as Array<number>;
  const numPoints = pointsSize[0];
  const pointsSum = matrixApply(points, 0, matrixSum);
  const centroid = matrixDivide(pointsSum, numPoints).valueOf() as Array<number>;
  return centroid;
}
