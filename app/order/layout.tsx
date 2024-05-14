import Footer from "@/components/Footer";
import HeaderClient from "@/components/HeaderClient";
import { defaultDescription, keyWordsSEO } from "@/shared/keywordsSEO";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raisa | Order",
  description: defaultDescription + " order page",
  keywords: keyWordsSEO,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <HeaderClient />
        <div className="min-h-[calc(100vh-64px)]">{children}</div>
        <Footer />
      </main>
    </>
  );
}
