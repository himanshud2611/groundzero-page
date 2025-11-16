import type { Metadata } from "next";
import Script from "next/script";
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
  title: "Ground Zero - Shaping the Frontier",
  description: "Exploring the ideas and breakthroughs shaping the future of AI and tech",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
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
        <script
          id="mcjs"
          dangerouslySetInnerHTML={{
            __html:
              '!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/5eb4e429e129f23f39c0ec97d/600f010230e12f24bc4fa1dc7.js");',
          }}
        />
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
      </body>
    </html>
  );
}
