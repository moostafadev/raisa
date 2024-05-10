import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col gap-4 h-full pb-16">
      <p className="text-2xl font-bold">اذهب الي صفحة الادمن</p>
      <Link href={"/admin"}>
        <Button size={"lg"} className="text-xl font-bold">
          أذهب
        </Button>
      </Link>
    </div>
  );
}
