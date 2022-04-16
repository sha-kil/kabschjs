import { GPU } from 'gpu.js';
// import { matrix } from 'mathjs';
// import { performance } from 'perf_hooks';

export function matrixMultiply(matrixA: number[][], matrixB: number[][]) {
  const matrixARow = matrixA.length;
  const matrixACol = matrixA[0].length;
  const matrixBCol = matrixB[0].length;

  const gpu = new GPU();
  const matrixMultiplyGPU = gpu
    .createKernel(function (a: number[][], b: number[][], matrixACol: number) {
      let sum = 0;

      for (let i = 0; i < matrixACol; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
      }
      return sum;
    })
    .setOutput([matrixARow, matrixBCol] as number[]);

  let multiplication = matrixMultiplyGPU(
    matrixA,
    matrixB,
    matrixACol
  ) as number[][];
  multiplication = multiplication.map((row) => [...row]);

  return multiplication;
}
