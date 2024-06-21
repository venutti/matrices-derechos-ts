import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Composición Max-Min de Matrices",
  description: "Página para calcular la composición max-min entre dos matrices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center p-16 bg-gray-100 text-gray-800">
          {children}
        </main>
      </body>
    </html>
  );
}
