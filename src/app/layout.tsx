import type { Metadata } from "next";
import Script from "next/script";
import { Gupter, Chivo_Mono } from "next/font/google";
import NewsletterPopup from "@/components/NewsletterPopup";
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
  title: "Ground Zero - Shaping the Frontier",
  description: "Exploring the ideas and breakthroughs shaping the future of AI and tech",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Ground Zero - Shaping the Frontier",
    description: "Exploring the ideas and breakthroughs shaping the future of AI and tech",
    url: "https://groundzeroai.in",
    siteName: "Ground Zero",
    images: [
      {
        url: "/g0.jpg",
        width: 1200,
        height: 630,
        alt: "Ground Zero",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ground Zero - Shaping the Frontier",
    description: "Exploring the ideas and breakthroughs shaping the future of AI and tech",
    images: ["/g0.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FL2WE1X227"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-FL2WE1X227');
          `}
        </Script>
      </head>
      <body
        className={`${gupter.variable} ${chivoMono.variable} antialiased`}
      >
        {children}
        <NewsletterPopup />
      </body>
    </html>
  );
}
