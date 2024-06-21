"use client";

import { useSearchParams } from "next/navigation";
import ErrorAlert from "../components/ErrorAlert";
import SquareMatrix from "../components/max-min-composition/SquareMatrix";
import ABComposition from "../components/max-min-composition/ABComposition";

export default function MatrixPage() {
  const searchParams = useSearchParams();
  const matrixParams = searchParams.get("matrix");

  if (!matrixParams) {
    return <ErrorAlert message="Debes especificar las matrices a calcular" />;
  }

  const pattern = /^(\d+)x(\d+)-(\d+)x(\d+)$/;
  const regex = new RegExp(pattern);
  const match = regex.exec(matrixParams);

  if (!match) {
    return <ErrorAlert message="Formato de matrices incorrecto" />;
  }

  const rowsMatrixA = parseInt(match[1], 10);
  const columnsMatrixA = parseInt(match[2], 10);
  const rowsMatrixB = parseInt(match[3], 10);
  const columnsMatrixB = parseInt(match[4], 10);

  const isSquare =
    rowsMatrixA === columnsMatrixA &&
    rowsMatrixA === rowsMatrixB &&
    rowsMatrixA === columnsMatrixB;

  return (
    <>
      {isSquare && <SquareMatrix size={rowsMatrixA} />}{" "}
      {!isSquare && (
        <ABComposition
          rowsMatrixA={rowsMatrixA}
          columnsMatrixA={columnsMatrixA}
          rowsMatrixB={rowsMatrixB}
          columnsMatrixB={columnsMatrixB}
        />
      )}
    </>
  );
}
