import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  onClick: () => void;
};

export default function MatrixLink({ label, onClick }: Readonly<Props>) {
  return (
    <Button
      className="text-2xl font-semibold group"
      onClick={onClick}
      size="lg"
    >
      {label}{" "}
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </Button>
  );
}
