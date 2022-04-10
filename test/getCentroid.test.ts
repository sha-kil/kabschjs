import { Point, PointSet } from '../src/typeDefinitions';
import { getCentroid } from '../src/helper';


describe("computing point set centroid", () => {
  test("computing point set centroid", () => {
    let point1 = [1, 2, 3];
    let point2 = [4, 5, 6];

    let pointSet = [point1, point2];

    let centroid = getCentroid([[1, 2, 4], [3, 6, 10]]);
    expect(centroid).toEqual([2, 4, 7]);

  });
});