/**
 * @fileOverView
 * project entry point
 * defines function kabsch
 */

type Point = [number, number, number];
type PointSet = Point[];

export function kabsch(setA: PointSet, setB: PointSet) {
  console.log(setA, setB);
}

kabsch([[0, 1, 2]], [[0, 1, 2]]);