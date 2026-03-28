import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Forge",
  description: "Modern PDF production SaaS starter"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
