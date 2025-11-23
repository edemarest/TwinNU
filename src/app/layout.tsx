import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { ThemeTransitionLayer } from "@/components/layout/theme-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "twinNU | Coming Soon",
  description:
    "Join the twinNU waitlist to experience slow-social pilots powered by digital twins and curated Twiniverses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-base text-foreground antialiased`}
      >
        <ThemeProvider>
          <ThemeTransitionLayer />
          <div className="relative min-h-screen">
            <div className="page-bokeh" />
            <div className="site-frame" />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
