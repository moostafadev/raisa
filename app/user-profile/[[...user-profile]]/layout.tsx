import Header from "@/components/Header";
import { defaultDescription, keyWordsSEO } from "@/shared/keywordsSEO";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raisa | Profile",
  description: defaultDescription + " profile page",
  keywords: keyWordsSEO,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="backdrop-blur-sm z-50 relative">{children}</div>
    </>
  );
}
