import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://printreadytools.com"),
  title: {
    template: "%s | PrintReadyTools",
    default: "Free Printable Generators for Busy Families | PrintReadyTools",
  },
  description:
    "Create chore charts, meal planners, medication trackers, cleaning schedules, pet feeding schedules, and more. Free printable PDFs — no sign-up required.",
  openGraph: {
    type: "website",
    siteName: "PrintReadyTools",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
