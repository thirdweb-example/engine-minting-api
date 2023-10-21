import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minting API with thirdweb Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
