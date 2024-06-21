import MatrixLink from "./components/MatrixLink";

export default function HomePage() {
  return (
    <>
      <h1 className="text-2xl mb-6">Selecciona la dimensión de las matrices</h1>

      <div className="mb-32 grid gap-4 text-center lg:mb-0 lg:w-full lg:max-w-3xl lg:grid-cols-2">
        <MatrixLink href="/matrix?matrix=8x8-8x8" label="Cuadrada 8x8" />
        <MatrixLink href="/matrix?matrix=5x8-8x7" label="5x8 ° 8x7" />
      </div>
    </>
  );
}
