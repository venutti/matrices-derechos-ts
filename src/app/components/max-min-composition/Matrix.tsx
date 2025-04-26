import { ParsedMatrix } from "@/utils";

type Props = {
  parsedMatrix: ParsedMatrix;
  handleCellChange?: (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => void;
  editable?: boolean;
};

export default function Matrix({
  parsedMatrix,
  handleCellChange,
  editable = true,
}: Readonly<Props>) {
  return parsedMatrix.map((row, rowIndex) => (
    <div key={rowIndex} className="flex">
      {row.map((col, colIndex) => (
        <input
          key={colIndex}
          type="number"
          disabled={!editable}
          className={`border border-gray-300 w-14 h-14 text-center focus:outline-none focus:bg-slate-200 hover:bg-slate-200 ${
            !editable && "bg-slate-200"
          }`}
          value={col}
          onChange={
            handleCellChange
              ? (e) => handleCellChange(rowIndex, colIndex, e.target.value)
              : undefined
          }
        />
      ))}
    </div>
  ));
}
