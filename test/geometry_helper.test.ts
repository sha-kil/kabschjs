import { getCentroid, checkOrientation } from '../src/geometry_helper';

describe('test geometry methods', () => {
  test('computing point set centroid', () => {
    const pointSet = [
      [1, 2, 4],
      [3, 6, 10]
    ];
    const centroid = getCentroid(pointSet);

    expect(centroid).toEqual([2, 4, 7]);
  });

  test("right handed matrix basis vectors orientation", () => {
    const identityMatrix = [[1,0,0], [0,1,0], [0,0,1]];
    const matrixChecked = checkOrientation(identityMatrix);
    expect(identityMatrix).toEqual(matrixChecked);
  });

  test("left handed matrix basis vectors orientation", () => {
    const leftHandedMatrix = [[-1,0,0], [0,1,0], [0,0,1]];
    const orientationCorrected = [[-1,0,0], [0,1,0], [0,0,-1]];
    const matrixChecked = checkOrientation(leftHandedMatrix);
    expect(matrixChecked).toEqual(orientationCorrected);
  });
});
