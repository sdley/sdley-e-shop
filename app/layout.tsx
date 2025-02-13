import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"], weight: ['400', '700']
});


export const metadata: Metadata = {
  title: "sdley e-shop",
  description: "sdley e-shop est une application de commerce electronique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
