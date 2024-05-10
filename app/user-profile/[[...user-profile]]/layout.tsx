import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Coursat Academy",
  description: "Profile page",
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
