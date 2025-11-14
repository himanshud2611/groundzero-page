import type { Metadata } from "next";
import { Gupter, Chivo_Mono } from "next/font/google";
import "./globals.css";

const gupter = Gupter({
  variable: "--font-gupter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ground Zero - AI & Tech Insights",
  description: "Exploring the ideas and breakthroughs shaping the future of AI and tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gupter.variable} ${chivoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
