import { Matrix } from "./matrix";

export type ParsedMatrix = string[][];

export function parseValue(value: string): number {
  return parseFloat(value.replace(",", "."));
}

export function parseMatrix(matrix: Matrix): ParsedMatrix {
  return matrix.map((row) => row.map((value) => value.toString()));
}

export function createParsedMatrix(
  rows: number,
  columns: number
): ParsedMatrix {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => "")
  );
}
