export const metadata = {
  title: "Privacy Policy | Sanas Nursery Uruli Kanchan",
  description:
    "Read the Privacy Policy of Sanas Nursery, Uruli Kanchan. Learn how we collect, use, and protect your personal information when you contact us or place an enquiry.",
  alternates: {
    canonical: "https://sanasnursery.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Sanas Nursery Uruli Kanchan",
    description:
      "Sanas Nursery respects your privacy. This page explains how we collect, use, and safeguard your personal data.",
    url: "https://sanasnursery.com/privacy-policy",
    siteName: "Sanas Nursery",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <section>{children}</section>
  );
}