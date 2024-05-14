import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "@/providers/Providers";
import MainFooter from "@/components/MainFooter";
import { defaultDescription, keyWordsSEO } from "@/shared/keywordsSEO";
import BtnTop from "@/components/BtnTop";

const inter = Cairo({
  subsets: ["arabic"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Raisa",
  description: defaultDescription,
  keywords: keyWordsSEO,
  icons: {
    icon: {
      url: "/raisa-icon.png",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="ar" dir="rtl">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="h-[100vh]">
              {children}
              <MainFooter />
              <BtnTop />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
