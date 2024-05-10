import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { sessionClaims } = auth();
  return (
    <div className="flex items-center justify-center flex-col gap-4 h-full pb-16">
      <p className="text-2xl font-bold">
        {sessionClaims?.metadata.role === "admin"
          ? "أذهب الي صفحة الادمن"
          : "انت ليس ادمن علي مطعم رايسه"}
      </p>
      <div className="flex gap-2">
        {sessionClaims?.metadata.role === "admin" ? (
          <Link href={"/admin"}>
            <Button size={"lg"} className="text-xl font-bold">
              أذهب
            </Button>
          </Link>
        ) : null}
        <Button
          size={"lg"}
          variant={"destructive"}
          className="text-xl font-bold"
        >
          <SignOutButton />
        </Button>
      </div>
    </div>
  );
}
