"use client";

import {
  ParsedMatrix,
  calcMaxMinCompositionMatrix,
  createParsedMatrix,
  parseMatrix,
  parseValue,
} from "@/utils";
import { useState } from "react";
import Matrix from "./Matrix";
import MatrixLink from "../MatrixLink";

type Props = {
  matrixA: ParsedMatrix;
  matrixB: ParsedMatrix;
  setMatrixA: (matrix: ParsedMatrix) => void;
  setMatrixB: (matrix: ParsedMatrix) => void;
};

export default function ABComposition({
  matrixA,
  matrixB,
  setMatrixA,
  setMatrixB,
}: Readonly<Props>) {
  const emptyMatrixA = createParsedMatrix(matrixA.length, matrixA[0].length);
  const emptyMatrixB = createParsedMatrix(matrixB.length, matrixB[0].length);
  const matrixADimensions = `(${matrixA.length}x${matrixA[0].length})`;
  const matrixBDimensions = `(${matrixB.length}x${matrixB[0].length})`;

  const [composition, setComposition] = useState<ParsedMatrix | null>(null);

  const handleCellChangeMatrixA = (
    rowIndex: number,
    colIndex: number,
    value: string
  ): void => {
    const newMatrixA = [...matrixA];
    newMatrixA[rowIndex][colIndex] = value;
    setMatrixA(newMatrixA);
  };

  const handleCellChangeMatrixB = (
    rowIndex: number,
    colIndex: number,
    value: string
  ): void => {
    const newMatrixB = [...matrixB];
    newMatrixB[rowIndex][colIndex] = value;
    setMatrixB(newMatrixB);
  };

  const handleReset = (): void => {
    setMatrixA(emptyMatrixA);
    setMatrixB(emptyMatrixB);
    setComposition(null);
  };

  const handleComposition = (): void => {
    const isComplete =
      matrixA.flat().every((value) => value !== "") &&
      matrixB.flat().every((value) => value !== "");
    if (!isComplete) {
      alert("Debe completar todos los valores de las matrices");
      return;
    }
    const parsedMatrixA = matrixA.map((row) =>
      row.map((col) => parseValue(col))
    );
    const parsedMatrixB = matrixB.map((row) =>
      row.map((col) => parseValue(col))
    );

    const composition = calcMaxMinCompositionMatrix(
      parsedMatrixA,
      parsedMatrixB
    );

    const parsedComposition = parseMatrix(composition);
    setComposition(parsedComposition);
  };

  return (
    <div>
      <div className="flex gap-4  justify-center flex-wrap">
        <div>
          <h2 className="text-center mb-4">
            Ingrese los valores de la matriz A {matrixADimensions}:
          </h2>
          <Matrix
            parsedMatrix={matrixA}
            handleCellChange={handleCellChangeMatrixA}
            editable={true}
          />
        </div>

        <div>
          <h2 className="text-center mb-4">
            Ingrese los valores de la matriz B {matrixBDimensions}:
          </h2>
          <Matrix
            parsedMatrix={matrixB}
            handleCellChange={handleCellChangeMatrixB}
            editable={true}
          />
        </div>
      </div>
      <div className="flex justify-center gap-4 my-4">
        <button
          onClick={handleComposition}
          className="hover:underline focus:underline"
        >
          Calcular
        </button>
        <button
          onClick={handleReset}
          className="hover:underline focus:underline"
        >
          Borrar
        </button>
      </div>
      {composition && (
        <div className="flex flex-col items-center flex-wrap gap-4">
          <h2>La composición max-min es la siguiente:</h2>
          <div>
            <Matrix parsedMatrix={composition} editable={false} />
          </div>
          {composition.length === 7 && composition[0].length === 8 && (
            <MatrixLink
              onClick={() => {
                setMatrixA(composition);
                setMatrixB(createParsedMatrix(8, 8));
                setComposition(null);
              }}
              label="Componer con matrix 8x8"
            />
          )}
        </div>
      )}
    </div>
  );
}
