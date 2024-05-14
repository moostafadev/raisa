import type { Metadata } from "next";
import Header from "@/components/Header";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Raisa | Admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!checkRole("admin")) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <main className="pt-20 pb-4 px-4 md:pr-[316px] min-h-[calc(100vh-62px)]">
        {children}
      </main>
    </>
  );
}
