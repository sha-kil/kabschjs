/**
 * @fileOverview
 * Defines various geometry related helper functions
 */

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





/**
 * computes centroid given a set of points
 * @param points
 * @returns centroid of 'points'
 */
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




/**
 * Matrix denotes the basis vectors of the linear space. The orientation of the
 * basis vector should not change after rotating. So after computing rotation
 * matrix, we should check if the orientation is the same as before. Sign of
 * determinant of the matrix gives the orientation of the basis vectors.
 * Therefore, if the sign of the determinant is negative, we multiply the third
 * column of rotation matrix by -1, so that the orientation changes and sign of
 * determinant becomes positive again.
 * @param rotationalMatrix
 * @returns 3x3 matrix
 */
export function checkOrientation(rotationalMatrix: number[][]) {
  const determinant = det(rotationalMatrix);
  if (determinant < 0) {
    const thirdColumn = subset(rotationalMatrix, index([0, 1, 2], 2));
    rotationalMatrix = subset(
      rotationalMatrix,
      index([0, 1, 2], 2),
      dotMultiply(thirdColumn, -1)
    );
  }

  //?getting -0 form dotMultiply is very weird
  for(let i = 0;i<rotationalMatrix.length;i++) {
    for(let j = 0;j<rotationalMatrix[i].length;j++) {
      rotationalMatrix[i][j] = rotationalMatrix[i][j] == 0 ? 0 : rotationalMatrix[i][j];
    }
  }

  return rotationalMatrix;
}
