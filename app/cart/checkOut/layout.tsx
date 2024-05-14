import { defaultDescription, keyWordsSEO } from "@/shared/keywordsSEO";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raisa | Check out",
  description: defaultDescription + " check out page",
  keywords: keyWordsSEO,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
