import type { Metadata } from "next";
import { defaultDescription, keyWordsSEO } from "@/shared/keywordsSEO";

export const metadata: Metadata = {
  title: "Raisa | Sign in",
  description: defaultDescription + " sign in page",
  keywords: keyWordsSEO,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex justify-center mt-12 min-h-[calc(100vh-3rem)]">
        {children}
      </main>
    </>
  );
}
