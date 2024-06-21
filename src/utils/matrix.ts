export type Matrix = number[][];

/**
 * Returns the size of a matrix as a tuple of its number of rows and columns.
 *
 * @param {Matrix} matrix - The matrix to get the size of.
 * @return {[number, number]} - A tuple containing the number of rows and columns in the matrix.
 */
function getSize(matrix: Matrix): [number, number] {
  return [matrix.length, matrix[0].length];
}

/**
 * A function that retrieves a specific row from a matrix.
 *
 * @param {Matrix} matrix - The matrix from which to retrieve the row.
 * @param {number} row - The index of the row to retrieve.
 * @return {number[]} The specified row from the matrix.
 */
function getRow(matrix: Matrix, row: number): number[] {
  return matrix[row];
}

/**
 * Retrieves the specified column from a matrix.
 *
 * @param {Matrix} matrix - The matrix from which to retrieve the column.
 * @param {number} column - The index of the column to retrieve.
 * @return {number[]} The specified column from the matrix.
 */
function getColumn(matrix: Matrix, column: number): number[] {
  return matrix.map((row) => row[column]);
}

/**
 * Creates a matrix with the specified number of rows and columns, filled with zeros.
 *
 * @param {number} rows - The number of rows in the matrix.
 * @param {number} columns - The number of columns in the matrix.
 * @return {Matrix} - The newly created matrix.
 */
function createMatrix(rows: number, columns: number): Matrix {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

/**
 * Calculates the maximum minimum composition value between a row and a column.
 *
 * @param {number[]} row - The row of numbers.
 * @param {number[]} column - The column of numbers.
 * @return {number} The maximum minimum composition value.
 */
function calcMaxMinCompositionValue(row: number[], column: number[]): number {
  return Math.max(...row.map((value, index) => Math.min(value, column[index])));
}

/**
 * Calculates the maximum minimum composition matrix between two matrices.
 *
 * @param {Matrix} matrixA - The first matrix.
 * @param {Matrix} matrixB - The second matrix.
 * @return {Matrix} The maximum minimum composition matrix.
 */
export function calcMaxMinCompositionMatrix(
  matrixA: Matrix,
  matrixB: Matrix
): Matrix {
  const [numRowsA] = getSize(matrixA);
  const [, numColsB] = getSize(matrixB);

  const composition = createMatrix(numRowsA, numColsB);

  for (let i = 0; i < numRowsA; i++) {
    for (let j = 0; j < numColsB; j++) {
      const row = getRow(matrixA, i);
      const column = getColumn(matrixB, j);

      composition[i][j] = calcMaxMinCompositionValue(row, column);
    }
  }

  return composition;
}
