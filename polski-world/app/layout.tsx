import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Polski World · Grammar Vault",
  description:
    "A gamified, high-energy way to master Polish grammar — cases, declensions and conjugation — in 30 visual, bite-sized days.",
  applicationName: "Polski World",
  keywords: [
    "Polish",
    "grammar",
    "cases",
    "declension",
    "learn Polish",
    "Mianownik",
    "Biernik",
    "Narzędnik",
    "Dopełniacz",
  ],
};

export const viewport: Viewport = {
  themeColor: "#070512",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
