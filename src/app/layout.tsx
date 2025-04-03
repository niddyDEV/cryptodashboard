import type { Metadata } from "next";
import { Pixelify_Sans, Red_Rose } from "next/font/google";
import "./globals.css";


const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: "500",
});

const redRose = Red_Rose({
  variable: "--font-red-rose",
  subsets: ["latin"],
  weight: "500",
})



export const metadata: Metadata = {
  title: "Myorn Wallet",
  description: "Myorn cryptowallet-dashboard powered with AI-assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelifySans.variable}  ${redRose.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
