import type { Metadata } from "next";
import { Catamaran } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/common/header/main-header";
import { ReCaptchaProvider } from "next-recaptcha-v3";
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
          <ReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          >{children}
          </ReCaptchaProvider>
        <MainFooter />
      </body>
    </html>
  );
}
