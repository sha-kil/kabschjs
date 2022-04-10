/**
 * @fileOverView
 * project entry point
 * defines function kabsch
 */


import { PointSet } from "./typeDefinitions";
import { getCentroid } from "./helper";

export function kabsch(setA: PointSet, setB: PointSet) {
  console.log(setA, setB);
  console.log(getCentroid(setA), getCentroid(setB));
}


kabsch([[0, 1, 2]], [[0, 1, 2]]);