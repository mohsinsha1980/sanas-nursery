import ReduxProvider from "@/components/layout/ReduxProvider";
import config from "@/config/env-config";
import type { Metadata } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { Catamaran } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import ClientLayout from "@/components/layout/ClientLayout";

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sanas Nursery",
  description: "One stop shop for all your nursery needs",
  alternates: {
    canonical: "https://sanasnursery.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5L6QZ5TL');`}
      </Script>
      <meta
        name="google-site-verification"
        content="bspwJaWHUbp2AJp3d4AuEk7QaaMgeFdyComfMMajsHU"
      />

      <body className={`${catamaran.variable} antialiased`}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5L6QZ5TL"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />

        <ReduxProvider>
          <ReCaptchaProvider reCaptchaKey={config.RECAPTCHA_SITE_KEY}>
            <NuqsAdapter>
              <AuthProvider>
                <ClientLayout>{children}</ClientLayout>
                <Toaster richColors />
              </AuthProvider>
            </NuqsAdapter>
          </ReCaptchaProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
