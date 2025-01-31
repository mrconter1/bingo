import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Party Bingo - Fun Interactive Party Game",
  description: "An interactive party bingo game with 50 fun challenges. Perfect for parties, gatherings, and social events. Complete challenges, mark your progress, and have fun!",
  keywords: "party game, bingo, social game, party challenges, interactive game",
  authors: [{ name: "Party Bingo Team" }],
  openGraph: {
    title: "Party Bingo - Fun Interactive Party Game",
    description: "An interactive party bingo game with 50 fun challenges. Perfect for parties, gatherings, and social events!",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Party Bingo Game Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Party Bingo - Fun Interactive Party Game",
    description: "An interactive party bingo game with 50 fun challenges. Perfect for parties!",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#9333ea", // Purple theme color
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
