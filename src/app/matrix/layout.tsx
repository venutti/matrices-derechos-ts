import Link from "next/link";

export default function MatrixLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Link href="/">&lt;- Volver</Link>
      {children}
    </div>
  );
}
