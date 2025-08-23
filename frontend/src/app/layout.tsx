import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/common/header/main-header";
import MainFooter from "@/components/common/footer/main-footer";

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanas Nursery",
  description: "One stop shop for all your nursery needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${catamaran.variable} antialiased`}>
        <MainHeader />
        <main>{children}</main>
        <MainFooter />
      </body>
    </html>
  );
}
