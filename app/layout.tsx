import type { Metadata } from "next";
import "./globals.css";
import "@fontsource-variable/dm-sans";

export const metadata: Metadata = {
  title: "Weave | Your Yield. Automated. Forever.",
  description: "Institutional-grade automated yield aggregator on Initia blockchain.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
