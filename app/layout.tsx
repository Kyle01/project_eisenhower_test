import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TabBar from "./components/TabBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Eisenhower",
  description: "Private Equity Boiler Test",
};

const tabs = [
  { label: "Limited Partners", url: "/limited_partners/10305" },
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
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
        </div>
      </body>
    </html>
  );
}
