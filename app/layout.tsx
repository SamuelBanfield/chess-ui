import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Opening Explorer",
  description: "A chess opening explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <header className="bg-gray-800 h-[8vh] text-white flex items-center">
        <h1 className="px-4 text-xl font-bold">Chess Opening Explorer</h1>
      </header>
      {children}
      </body>
    </html>
  );
}
