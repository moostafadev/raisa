import { defaultDescription, keyWordsSEO } from "@/shared/keywordsSEO";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Raisa | Sign up",
  description: defaultDescription + " sign up",
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
