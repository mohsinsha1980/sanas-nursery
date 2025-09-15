"use client";
import MainFooter from "@/components/common/footer/main-footer";
import WhatsappBadge from "@/components/common/footer/whatsapp-badge";
import MainHeader from "@/components/common/header/main-header";
import Loader from "@/components/layout/Loader";
import PageLoader from "@/components/layout/PageLoader";
import { useEffect, useState } from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsInitialLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      {!isInitialLoading ? (
        <main className="flex-grow">{children}</main>
      ) : (
        <PageLoader message="Welcome to Sanas Nursery" showLogo={true} />
      )}
      <MainFooter />
      {isInitialLoading ? (
        <PageLoader message="Welcome to Sanas Nursery" showLogo={true} />
      ) : (
        <WhatsappBadge />
      )}
      <Loader />
    </div>
  );
};

export default ClientLayout;
