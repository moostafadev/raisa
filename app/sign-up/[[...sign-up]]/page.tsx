import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="my-10">
      <SignUp path="/sign-up" forceRedirectUrl={"/admin"} />
    </div>
  );
}
