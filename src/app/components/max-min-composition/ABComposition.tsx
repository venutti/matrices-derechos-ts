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

type Props = {
  rowsMatrixA: number;
  columnsMatrixA: number;
  rowsMatrixB: number;
  columnsMatrixB: number;
};

export default function ABComposition({
  rowsMatrixA,
  columnsMatrixA,
  rowsMatrixB,
  columnsMatrixB,
}: Readonly<Props>) {
  const emptyMatrixA = createParsedMatrix(rowsMatrixA, columnsMatrixA);
  const emptyMatrixB = createParsedMatrix(rowsMatrixB, columnsMatrixB);

  const [matrixA, setMatrixA] = useState<ParsedMatrix>(emptyMatrixA);
  const [matrixB, setMatrixB] = useState<ParsedMatrix>(emptyMatrixB);

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
    console.log(parsedMatrixA.length);
    console.log(parsedMatrixB.length);
    console.log(composition.length);
    const parsedComposition = parseMatrix(composition);
    console.log(parsedComposition.length);
    setComposition(parsedComposition);
  };

  return (
    <div>
      <div className="flex gap-4  justify-center flex-wrap">
        <div>
          <h2 className="text-center mb-4">
            Ingrese los valores de la matriz A:
          </h2>
          <Matrix
            parsedMatrix={matrixA}
            handleCellChange={handleCellChangeMatrixA}
            editable={true}
          />
        </div>

        <div>
          <h2 className="text-center mb-4">
            Ingrese los valores de la matriz B:
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
        <div className="flex flex-col items-center flex-wrap">
          <h2>La composición max-min es la siguiente:</h2>
          <Matrix parsedMatrix={composition} editable={false} />
        </div>
      )}
    </div>
  );
}
