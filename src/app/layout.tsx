import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import TabbedLayout from "@/components/layout/TabbedLayout";
import Omnibar from "@/components/Omnibar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alliance OS",
  description: "Modernized Insurance Administration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen w-full", inter.className)}>
        <TabbedLayout>
          {children}
        </TabbedLayout>
        
      </body>
    </html>
  );
}
