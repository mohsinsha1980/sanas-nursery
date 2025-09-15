export const metadata = {
  title: "Sanas Nursery – Wholesale Plant Nursery Uruli Kanchan",
  description:
    "Visit Sanas Nursery, a wholesale plant nursery in Uruli Kanchan, Maharashtra. Wide range of fruit plants, flower trees & healthy greenery.",
  alternates: {
    canonical: "https://sanasnursery.com/about",
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