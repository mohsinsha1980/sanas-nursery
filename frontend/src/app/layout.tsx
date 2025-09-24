import AuthProvider from "@/components/auth/AuthProvider";
import ClientLayout from "@/components/layout/ClientLayout";
import ReduxProvider from "@/components/layout/ReduxProvider";
import config from "@/config/env-config";
import type { Metadata } from "next";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { Catamaran } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import "./globals.css";
import { SITE_DATA } from "@/lib/constants";
import { SITE } from "@/assets";

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sanasnursery.com"),
  title: {
    default: "Sanas Nursery | Wholesale Plant Nursery in Uruli Kanchan Pune",
    template: "%s | Sanas Nursery",
  },
  description:
    "Sanas Nursery - Your trusted wholesale plant supplier in Uruli Kanchan, Pune. Premium fruit trees, flowering plants, shadow trees & masala plants.",
  keywords: [
    "wholesale plant nursery",
    "plant nursery Pune",
    "fruit trees Maharashtra",
    "flowering plants Uruli Kanchan",
    "shadow trees wholesale",
    "masala plants",
    "plant supplier Pune",
    "nursery plants Maharashtra",
    "bulk plant orders",
    "plant consultation",
  ],
  authors: [{ name: "Sanas Nursery" }],
  openGraph: {
    type: "website",
    url: "https://sanasnursery.com/",
    siteName: "Sanas Nursery",
    title: "Sanas Nursery | Wholesale Plant Nursery in Uruli Kanchan Pune",
    description:
      "Sanas Nursery - Your trusted wholesale plant supplier in Uruli Kanchan, Pune. Premium fruit trees, flowering plants, shadow trees & masala plants.",
    images: [
      {
        url: SITE.SEO_LOGO,
        width: 1200,
        height: 630,
        alt: "Sanas Nursery - Plants and Gardening Supplies",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanas Nursery | Wholesale Plant Nursery in Uruli Kanchan Pune",
    description:
      "Sanas Nursery - Your trusted wholesale plant supplier in Uruli Kanchan, Pune. Premium fruit trees, flowering plants, shadow trees & masala plants.",
    images: [SITE.SEO_LOGO],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "bspwJaWHUbp2AJp3d4AuEk7QaaMgeFdyComfMMajsHU",
  },
  alternates: {
    canonical: "https://sanasnursery.com/",
    languages: {
      "en-IN": "https://sanasnursery.com/",
    },
  },
  category: "Agriculture & Gardening",
  classification: "Wholesale Plant Nursery",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Sanas Nursery",
    "msapplication-TileColor": "#22c55e",
    "msapplication-TileImage": "/images/site/sanas-nursery.webp",
    "msapplication-config": "/browserconfig.xml",
    "mobile-web-app-capable": "yes",
    "application-name": "Sanas Nursery",
    "msapplication-tooltip": "Sanas Nursery - Wholesale Plant Nursery",
    "msapplication-starturl": "/",
    "msapplication-navbutton-color": "#22c55e",
    "msapplication-window": "width=1024;height=768",
  },
  icons: {
    icon: "/favicon.ico",
    apple: SITE.FAVICON_IOS,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#22c55e" },
    { media: "(prefers-color-scheme: dark)", color: "#16a34a" },
  ],
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

        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Sanas Nursery",
            url: "https://sanasnursery.com",
            logo: SITE.SEO_LOGO,
            sameAs: [
              SITE_DATA.GOOGLE_MAP_FOR_SEO,
              SITE_DATA.SOCIAL.facebook,
              SITE_DATA.SOCIAL.insta,
              SITE_DATA.SOCIAL.youtube,
            ],
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: SITE_DATA.phone,
                email: SITE_DATA.EMAIL,
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: ["en", "mr"],
              },
            ],
          })}
        </Script>

        <Script
          id="localbusiness-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GardenStore",
            name: "Sanas Nursery",
            image: "https://sanasnursery.com/images/site/sanas-nursery.webp",
            url: "https://sanasnursery.com",
            telephone: SITE_DATA.phone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Uruli Kanchan",
              addressLocality: "Pune",
              addressRegion: "Maharashtra",
              postalCode: "412202",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 18.4814363,
              longitude: 74.1640689,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
            ],
          })}
        </Script>

        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: "https://sanasnursery.com",
            name: "Sanas Nursery",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://sanasnursery.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>

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
