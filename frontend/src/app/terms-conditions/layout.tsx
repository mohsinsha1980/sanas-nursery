export const metadata = {
  title: "Terms & Conditions – Sanas Nursery, Uruli Kanchan",
  description:
    "Read the Terms & Conditions for using Sanas Nursery’s website. Understand our policies on enquiries, orders, payments, delivery, and data usage in Uruli Kanchan, Maharashtra.",
  alternates: {
    canonical: "https://sanasnursery.com/terms-conditions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

