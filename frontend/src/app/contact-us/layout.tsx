export const metadata = {
  title: "Contact Us – We’re Located in Uruli Kanchan, Pune",
  description:
    "Whether you have questions or need support, contact us today! Located in Uruli Kanchan, Pune, Maharashtra, we’re ready to assist with all your needs.",
  alternates: {
    canonical: "https://sanasnursery.com/contact-us",
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