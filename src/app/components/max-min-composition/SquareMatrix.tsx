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
  matrix: ParsedMatrix;
  setMatrix: (matrix: ParsedMatrix) => void;
};

export default function SquareMatrix({ matrix, setMatrix }: Readonly<Props>) {
  const emptyMatrix = createParsedMatrix(matrix.length, matrix.length);
  const [composition, setComposition] = useState<ParsedMatrix | null>(null);

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ): void => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = value;
    setMatrix(newMatrix);
  };

  const handleReset = (): void => {
    setMatrix(emptyMatrix);
    setComposition(null);
  };

  const handleComposition = (): void => {
    const isComplete = matrix.flat().every((value) => value !== "");
    if (!isComplete) {
      alert("Debe completar todos los valores de la matriz");
      return;
    }
    const parsedMatrix = matrix.map((row) => row.map((col) => parseValue(col)));

    const composition = calcMaxMinCompositionMatrix(parsedMatrix, parsedMatrix);
    const parsedComposition = parseMatrix(composition);
    setComposition(parsedComposition);
  };

  return (
    <div>
      <div className="flex gap-4  justify-center flex-wrap items-center">
        <div>
          <h2 className="text-center mb-4">
            Ingrese los valores de la matriz:
          </h2>
          <Matrix
            parsedMatrix={matrix}
            handleCellChange={handleCellChange}
            editable={true}
          />
        </div>
        {composition && (
          <div>
            <h2 className="text-center mb-4">
              La composición max-min con si misma es la siguiente:
            </h2>
            <Matrix parsedMatrix={composition} editable={false} />
          </div>
        )}
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
    </div>
  );
}
