/**
 * @fileOverView
 * project entry point
 * defines function kabsch
 */


import { Point, PointSet } from "./typeDefinitions";
import { getCentroid } from "./helper";
import { SVD } from 'svd-js';
import {
  subtract as matrixSubtract,
  transpose,
  multiply as matrixMultiply,
  dotMultiply,
} from 'mathjs'


export function kabsch(setA: number[][], setB: number[][]) {
  const centroidA = getCentroid(setA);
  const centroidB = getCentroid(setB);
  console.log("centroids: ", centroidA, centroidB);

  const centroidAToOrigin = setA.map((row) => matrixSubtract(row, centroidA));
  const centroidBToOrigin = setB.map((row) => matrixSubtract(row, centroidA));
  console.log("centroid shifted to origin: ", centroidAToOrigin, centroidBToOrigin);

  const centroidBToOriginTransposed = transpose(centroidBToOrigin);
  const covariance = matrixMultiply(centroidAToOrigin, centroidBToOriginTransposed);
  console.log(covariance);
  const { u, v, q } = SVD(covariance);
  console.log(u);
  console.log(v);
  console.log(q);

  const rotationalMatrix = matrixMultiply(u, transpose(v));
  console.log('rotational matrix: ', rotationalMatrix);
  return rotationalMatrix;
}

export function getRigidTransformation(setA: number[][], setB: number[][]) {
  const rotationalMatrix = kabsch(setA, setB);
  const translationVector = dotMultiply(getCentroid(setA), -1.0);
  return [rotationalMatrix, translationVector];
}


const point1 = [1, 2, 3];
const point2 = [4, 5, 6];
//const setA: Matrix = createMatrix([point1, point2]);

const point3 = [1, 2, 3];
const point4 = [4, 5, 6];
//const setB: Matrix = createMatrix([point3, point4]);

kabsch([point1, point2], [point3, point4]);