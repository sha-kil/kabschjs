/**
 * @fileOverView
 * project entry point
 * defines rigid 3D transformation between two sets of points
 */

import { getCentroid, checkOrientation } from './geometry_helper';
import { checkValidPointSets } from './input_helper';
import { matrixMultiply } from './linear_algebra_gl';
import { SVD } from 'svd-js';
import {
  add as matrixAdd,
  subtract as matrixSubtract,
  transpose,
  dotMultiply
} from 'mathjs';





/**
 * entry function for the module.
 * @param setA 
 * @param setB 
 * @returns 4x3 rigid transformation matrix
 */
export function getRigidTransformation(setA: number[][], setB: number[][]) {
  checkValidPointSets(setA, setB);
  return getTransformation(setA, setB);
}




/**
 * Given two point sets having one to one correspondence for each point pair,
 * returns a rigid transformation matrix.
 * @param setA
 * @param setB
 * @returns 4x3 matrix
 */
function getTransformation(setA: number[][], setB: number[][]) {
  const rotationalMatrix = kabsch(setA, setB);
  const unRotatedTranslation = dotMultiply(getCentroid(setA), -1.0).valueOf() as number[];
  const unRotatedTranslationTransposed = unRotatedTranslation.map(el=>[el]);

  const rotatedTranslation = matrixMultiply(
    rotationalMatrix,
    unRotatedTranslationTransposed
  );
  const rotatedTranslationPoint = rotatedTranslation.flat();
  const pointSetBCentroid = getCentroid(setB);

  const translationVector = matrixAdd(
    rotatedTranslationPoint,
    pointSetBCentroid
  ) as number[];

  return [rotationalMatrix, translationVector];
}




/**
 * implements kabsch algorithm to find rotation matrix between two point sets
 * https://en.wikipedia.org/wiki/Kabsch_algorithm
 * @param setA
 * @param setB
 * @returns 3x3 rotation matrix
 */
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

  rotationalMatrix = checkOrientation(rotationalMatrix);
  return rotationalMatrix;
}
