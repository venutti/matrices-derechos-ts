"use client";
import { useState } from "react";
import MatrixLink from "./components/MatrixLink";
import SquareMatrix from "./components/max-min-composition/SquareMatrix";
import ABComposition from "./components/max-min-composition/ABComposition";
import { Button } from "@/components/ui/button";
import { createParsedMatrix, ParsedMatrix } from "@/utils";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Matrixes {
  rowsMatrixA: number;
  columnsMatrixA: number;
  rowsMatrixB: number;
  columnsMatrixB: number;
}

export default function HomePage() {
  const [matrixA, setMatrixA] = useState<ParsedMatrix | null>(null);
  const [matrixB, setMatrixB] = useState<ParsedMatrix | null>(null);
  const [isSquare, setIsSquare] = useState<boolean>(false);

  return (
    <>
      {!matrixA && !matrixB && (
        <div>
          <h1 className="text-2xl mb-6 text-center">
            Selecciona la dimensión de las matrices
          </h1>

          <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:w-full lg:max-w-3xl lg:grid-cols-2">
            <MatrixLink
              onClick={() => {
                setMatrixA(createParsedMatrix(8, 8));
                setMatrixB(createParsedMatrix(8, 8));
                setIsSquare(true);
              }}
              label="Cuadrada 8x8"
            />
            <MatrixLink
              onClick={() => {
                setMatrixA(createParsedMatrix(5, 8));
                setMatrixB(createParsedMatrix(8, 7));
              }}
              label="5x8 ° 8x7"
            />
            <MatrixLink
              onClick={() => {
                setMatrixA(createParsedMatrix(7, 7));
                setMatrixB(createParsedMatrix(7, 8));
              }}
              label="7x7 ° 7x8"
            />
          </div>
        </div>
      )}

      {!matrixA && matrixB && (
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Matriz A</CardTitle>
              <CardDescription>
                Selecciona la dimensión de la martiz A.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {matrixA && matrixB && (
        <div>
          <Button
            variant="link"
            onClick={() => {
              setMatrixA(null);
              setMatrixB(null);
              setIsSquare(false);
            }}
          >
            &lt;- Volver
          </Button>
          {isSquare ? (
            <SquareMatrix
              matrix={matrixA}
              setMatrix={(matrix) => {
                setMatrixA(matrix);
                setMatrixB(matrix);
              }}
            />
          ) : (
            <ABComposition
              matrixA={matrixA}
              matrixB={matrixB}
              setMatrixA={setMatrixA}
              setMatrixB={setMatrixB}
            />
          )}
        </div>
      )}
    </>
  );
}
