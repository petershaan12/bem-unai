// app/vote/thankyou/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ThankYouClient from "./ThankYouClient";

export default async function ThankYouPage() {
  const session = await getServerSession();
  if (!session) redirect("/vote");

  return <ThankYouClient />;
}
