import { getCentroid } from '../src/helper';

describe("computing point set centroid", () => {
  test("computing point set centroid", () => {
    const pointSet = [[1, 2, 4], [3, 6, 10]];
    const centroid = getCentroid(pointSet);

    expect(centroid).toEqual([2, 4, 7]);
  });
});