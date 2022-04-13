/**
 * @fileOverView
 * project entry point
 * defines function kabsch
 */


import { Point, PointSet } from "./typeDefinitions";
import { getCentroid } from "./helper";
import { SVD } from 'svd-js';
import {
  add as matrixAdd,
  subtract as matrixSubtract,
  transpose,
  multiply as matrixMultiply,
  dotMultiply,
  identity as mathIdentity,
  sum as matrixSum,
  apply as matrixApply
} from 'mathjs'


export function kabsch(setA: number[][], setB: number[][]) {
  const centroidA = getCentroid(setA);
  const centroidB = getCentroid(setB);
  console.log("centroids: ", centroidA, centroidB);

  const centroidAToOrigin = setA.map((row) => matrixSubtract(row, centroidA));
  const centroidBToOrigin = setB.map((row) => matrixSubtract(row, centroidB));
  console.log("centroid shifted to origin: ", centroidAToOrigin, centroidBToOrigin);
  const centroidAToOriginTransposed = transpose(centroidAToOrigin);
  const centroidBToOriginTransposed = transpose(centroidBToOrigin);
  console.log("centroid shifted to origin transposed: ", centroidAToOriginTransposed, centroidBToOriginTransposed);
  const covariance = matrixMultiply(centroidAToOriginTransposed, centroidBToOrigin);
  console.log('covariance: ', covariance);
  const { u, v, q } = SVD(covariance, true, true, Number.MIN_VALUE);
  console.log('u: ', u);
  console.log('v: ', v);
  console.log('q: ', q);

  const rotationalMatrix = matrixMultiply(u, transpose(v));
  console.log('rotational matrix: ', rotationalMatrix);
  return rotationalMatrix;
}

export function getRigidTransformation(setA: number[][], setB: number[][]) {
  const rotationalMatrix = kabsch(setA, setB);
  const translationVector = matrixAdd(matrixMultiply(rotationalMatrix, dotMultiply(getCentroid(setA), -1.0)), getCentroid(setB));
  return [rotationalMatrix, translationVector];
}