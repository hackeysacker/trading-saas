import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trading Academy - Learn to Trade Profitably",
  description: "Interactive trading education, AI coaching, and paper trading simulation. Learn stocks and crypto trading with zero risk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-gray-950 text-white min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
