import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="my-10">
      <SignIn path="/sign-in" forceRedirectUrl={"/admin"} />
    </div>
  );
}
