import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"], // 只加载拉丁字符集
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // 加载全部字重字体
  variable: "--font-poppins", // 定义一个 CSS 变量，方便在全局 CSS 里使用该字体
});

export const metadata: Metadata = {
  title: "Store It",
  description: "store it -- the only storage solution you need",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
