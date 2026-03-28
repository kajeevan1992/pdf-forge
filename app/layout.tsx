import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF SaaS Starter",
  description: "Starter for your PDF imposition SaaS"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}