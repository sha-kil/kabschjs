import { matrixMultiply } from '../src/linear_algebra_gl';

describe('matrix multiplication', () => {
  test('matrix matrix', () => {
    const matrix1 = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const matrix2 = [
      [10, 11, 12],
      [13, 14, 15],
      [16, 17, 18]
    ];
    const product = [
      [84, 90, 96],
      [201, 216, 231],
      [318, 342, 366]
    ];

    expect(matrixMultiply(matrix1, matrix2)).toEqual(product);
  });

  test('matrix vector', () => {
    const matrix = [
      [3, 0, 0],
      [0, 2, 0],
      [0, 0, 1]
    ];
    const vector = [[1], [1], [1]];
    const product = [[3], [2], [1]];

    expect(matrixMultiply(matrix, vector)).toEqual(product);
  });
});
