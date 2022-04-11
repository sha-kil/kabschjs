import { Point, PointSet } from '../src/typeDefinitions';
import { getCentroid } from '../src/helper';


describe("computing point set centroid", () => {
  test("computing point set centroid", () => {
    let point1: Point = [1, 2, 4];
    let point2: Point = [3, 6, 10];

    let pointSet: PointSet = [point1, point2];

    let centroid = getCentroid(pointSet);
    expect(centroid).toEqual([2, 4, 7]);

  });
});