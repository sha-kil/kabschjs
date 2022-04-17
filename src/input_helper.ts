/**
 *
 * @fileOverview
 * Checks for valid inputs
 */





/**
 * Checks input (point sets). Checks:
 *  - Both point sets have equal number of points
 *  - Points sets are compatible for matrix multiplication
 * @param setA
 * @param setB
 * @param pointDimension
 * @returns
 */
export function checkValidPointSets(
  setA: number[][],
  setB: number[][],
  pointDimension = 3
) {
  const colSizeA = setA[0].length;
  const colSizeB = setB[0].length;
  const rowSizeA = setA.length;
  const rowSizeB = setB.length;

  if (colSizeA != pointDimension || colSizeB != pointDimension) {
    throw `point dimension size must be ${pointDimension}`;
  }

  if (rowSizeA != rowSizeB) {
    throw `both point sets must have same number of points`;
  }

  return (
    colSizeA == pointDimension && colSizeA == colSizeB && rowSizeA == rowSizeB
  );
}
