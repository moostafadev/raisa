import { getCartsAction, getOneCartAction } from "@/actions/menu.action";
import { defaultDescription, keyWordsSEO } from "@/shared/keywordsSEO";
import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Raisa | Check out",
  description: defaultDescription + " check out page",
  keywords: keyWordsSEO,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const cart = await getOneCartAction({
    email: user?.emailAddresses[0].emailAddress as string,
  });
  const result = cart.find((item) => item.condition === false);
  console.log(result);

  if (!result) {
    redirect("/cart");
  }
  return (
    <>
      <main>{children}</main>
    </>
  );
}
