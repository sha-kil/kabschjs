/**
 * @fileOverView
 * project entry point
 * defines function kabsch https://en.wikipedia.org/wiki/Kabsch_algorithm
 * defines rigid 3D transformation between two sets of points
 */

import { getCentroid, checkReflection } from './helper';
import { SVD } from 'svd-js';
import {
  add as matrixAdd,
  subtract as matrixSubtract,
  transpose,
  multiply as matrixMultiply,
  dotMultiply
} from 'mathjs';

export function getRigidTransformation(setA: number[][], setB: number[][]) {
  const rotationalMatrix = kabsch(setA, setB);
  const translationVector = matrixAdd(
    matrixMultiply(rotationalMatrix, dotMultiply(getCentroid(setA), -1.0)),
    getCentroid(setB)
  ) as number[];
  return [rotationalMatrix, translationVector];
}

function kabsch(setA: number[][], setB: number[][]) {
  const centroidA = getCentroid(setA);
  const centroidB = getCentroid(setB);

  const centroidAToOrigin = setA.map((row) => matrixSubtract(row, centroidA));
  const centroidBToOrigin = setB.map((row) => matrixSubtract(row, centroidB));
  const centroidAToOriginTransposed = transpose(centroidAToOrigin);

  const covariance = matrixMultiply(
    centroidAToOriginTransposed,
    centroidBToOrigin
  );
  const { u, v } = SVD(covariance, true, true, Number.MIN_VALUE);
  let rotationalMatrix = matrixMultiply(v, transpose(u));

  rotationalMatrix = checkReflection(rotationalMatrix);
  return rotationalMatrix;
}
