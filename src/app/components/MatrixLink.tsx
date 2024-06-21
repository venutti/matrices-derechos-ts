import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export default function MatrixLink({ href, label }: Readonly<Props>) {
  return (
    <Link
      href={href}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-700 hover:bg-gray-600 hover:text-gray-100"
      rel="noopener noreferrer"
    >
      <h2 className="text-2xl font-semibold">
        {label}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
    </Link>
  );
}
