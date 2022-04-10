import { PointSet, Point } from "./typeDefinitions";

export function getCentroid(points: PointSet): Point {
  const setLength = points.length * 1.0;
  const pointSum = points.reduce((pVal, cVal) => [pVal[0] + cVal[0], pVal[1] + cVal[1], pVal[2] + cVal[2]], [0, 0, 0]);
  return [pointSum[0] / setLength, pointSum[1] / setLength, pointSum[2] / setLength];
}
