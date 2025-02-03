// app/layout.tsx (RootLayout)

import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Station",
  description: "Default description for the site",
};

export default function RootLayout({
  children,
  metadata,
}: Readonly<{ children: React.ReactNode; metadata?: Metadata }>) {
  return (
    <html lang="en">
      <head>
        <meta name="title" content={String(metadata?.title || "Default Title")} />
        <meta name="description" content={String(metadata?.description || "Default description")} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
