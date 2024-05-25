import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP, Source_Code_Pro } from "next/font/google";
import "@/app/styles/global.css";

export const metadata: Metadata = {
  title: "学マスUtil",
  description: "学園アイドルマスター Utility Tools by kadoyukasi",
};

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto_sans_jp",
});

const sourceCodePro = Source_Code_Pro({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source_code_pro",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${sourceCodePro.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
