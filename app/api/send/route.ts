import { Resend } from "resend";
import { render } from "@react-email/render";
import KoalaWelcomeEmail from "@/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email, userFirstname, result } = await request.json();

  const { data, error } = await resend.emails.send({
    from: email,
    to: "mostafa.sasa20004@gmail.com",
    subject: "Thank you",
    html: render(KoalaWelcomeEmail({ userFirstname, result })),
  });

  if (error) {
    return Response.json(error);
  }

  return Response.json({ message: "Email sent successfully" });
}
