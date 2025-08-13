import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsappBadge from "../components/whatsapp-badge";

export const metadata: Metadata = {
  title: "Sanas Nursery - Coming Soon",
  description:
    "Welcome to Sanas Nursery. Our main website is under construction. Stay tuned for amazing things!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsappBadge />
        </div>
      </body>
    </html>
  );
}
