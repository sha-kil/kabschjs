/**
 * @fileOverView
 * project entry point
 * defines function kabsch https://en.wikipedia.org/wiki/Kabsch_algorithm
 * defines rigid 3D transformation between two sets of points
 */

import { getCentroid, checkReflection, checkValidPointSets } from './helper';
import { matrixMultiply } from './linear_algebra_gl';
import { SVD } from 'svd-js';
import {
  add as matrixAdd,
  subtract as matrixSubtract,
  transpose,
  dotMultiply
} from 'mathjs';

export function getRigidTransformation(setA: number[][], setB: number[][]) {
  const validSize = checkValidPointSets(setA, setB);
  if (!validSize) {
    throw 'given parameters for getRigidTransformation were wrong!';
  }

  return getTransformation(setA, setB);
}

function getTransformation(setA: number[][], setB: number[][]) {
  const rotationalMatrix = kabsch(setA, setB);
  const unRotatedTranslation = [
    dotMultiply(getCentroid(setA), -1.0)
  ] as number[][];

  const rotatedTranslation = matrixMultiply(
    rotationalMatrix,
    transpose(unRotatedTranslation)
  ).flat();
  const pointSetBCentroid = getCentroid(setB);

  const translationVector = matrixAdd(
    rotatedTranslation,
    pointSetBCentroid
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
