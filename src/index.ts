/**
 * @fileOverView
 * project entry point
 * defines function kabsch
 */

import { getCentroid } from "./helper";
import { SVD } from 'svd-js';
import {
  add as matrixAdd,
  subtract as matrixSubtract,
  transpose,
  multiply as matrixMultiply,
  dotMultiply,
  index,
  subset,
  det
} from 'mathjs'


export function kabsch(setA: number[][], setB: number[][]) {
  const centroidA = getCentroid(setA);
  const centroidB = getCentroid(setB);

  const centroidAToOrigin = setA.map((row) => matrixSubtract(row, centroidA));
  const centroidBToOrigin = setB.map((row) => matrixSubtract(row, centroidB));
  const centroidAToOriginTransposed = transpose(centroidAToOrigin);

  const covariance = matrixMultiply(centroidAToOriginTransposed, centroidBToOrigin);
  const { u, v } = SVD(covariance, true, true, Number.MIN_VALUE);
  let rotationalMatrix = matrixMultiply(v, transpose(u));

  const determinant = det(rotationalMatrix);
  if (determinant < 0) {
    const thirdColumn = subset(rotationalMatrix, index([0, 1, 2], 2));
    rotationalMatrix = subset(rotationalMatrix, index([0, 1, 2], 2), dotMultiply(thirdColumn, -1));
  }

  return rotationalMatrix;
}

export function getRigidTransformation(setA: number[][], setB: number[][]) {
  const rotationalMatrix = kabsch(setA, setB);
  const translationVector = matrixAdd(matrixMultiply(rotationalMatrix, dotMultiply(getCentroid(setA), -1.0)), getCentroid(setB));
  return [rotationalMatrix, translationVector];
}