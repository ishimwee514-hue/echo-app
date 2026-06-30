import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECHO - Hear the whispers of the past",
  description: "Legendary events, ancient heritage, and timeless philosophy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}