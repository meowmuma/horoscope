import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Font สำหรับหัวข้อ - ดูหรูหราและโรแมนติก
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Font สำหรับเนื้อหา - อ่านง่าย
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Destiny of Love - ทำนายดวงความรัก",
  description: "เว็บไซต์ทำนายดวงความรัก ตรวจดวงตามราศี ไพ่ทาโรต์ความรัก และดูนิสัย 12 ราศี พร้อมคำทำนายเกี่ยวกับความรักที่แม่นยำ",
  keywords: "ดวงความรัก, ทำนายดวง, ไพ่ทาโรต์, 12 ราศี, ดูดวง, ความรัก, โหราศาสตร์",
  authors: [{ name: "Thirakit Kianlee" }],
  creator: "Thirakit Kianlee",
  openGraph: {
    title: "Destiny of Love - ทำนายดวงความรัก",
    description: "เว็บไซต์ทำนายดวงความรัก ตรวจดวงตามราศี ไพ่ทาโรต์ความรัก และดูนิสัย 12 ราศี",
    type: "website",
    locale: "th_TH",
    siteName: "Destiny of Love",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destiny of Love - ทำนายดวงความรัก",
    description: "เว็บไซต์ทำนายดวงความรัก ตรวจดวงตามราศี ไพ่ทาโรต์ความรัก และดูนิสัย 12 ราศี",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#E8D4F8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
        style={{
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}