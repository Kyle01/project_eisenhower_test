import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TabBar from "./components/TabBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PE Boiler Test",
  description: "Private Equity Boiler Test",
};

const tabs = [
  { label: "Limited Partners", url: "/limited_partners/1" },
  { label: "Reports", url: "/reports" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TabBar tabs={tabs} />
        {children}
      </body>
    </html>
  );
}
